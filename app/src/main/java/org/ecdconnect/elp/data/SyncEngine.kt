package org.ecdconnect.elp.data

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import org.ecdconnect.elp.model.PendingOp
import org.ecdconnect.elp.model.SyncState
import java.util.UUID

/**
 * Drains the local pending-op queue when connectivity returns and exposes the
 * ambient [SyncState] the UI chips render. The platform is the source of truth;
 * ops are only cleared once acknowledged (stubbed here — the GoLang API lands
 * in a later tranche behind [pushToPlatform]).
 */
class SyncEngine(
    private val store: LocalStore,
    private val connectivity: ConnectivityObserver,
    private val scope: CoroutineScope,
) {

    val syncState: StateFlow<SyncState> =
        combine(connectivity.isOnline, store.pendingOps) { online, ops ->
            when {
                !online -> SyncState.OFFLINE
                ops.isNotEmpty() -> SyncState.PENDING
                else -> SyncState.SYNCED
            }
        }.stateIn(scope, SharingStarted.Eagerly, initialSyncState())

    private fun initialSyncState() =
        if (connectivity.currentlyOnline()) SyncState.SYNCED else SyncState.OFFLINE

    fun start() {
        scope.launch {
            connectivity.isOnline.collect { online ->
                if (online) drainQueue()
            }
        }
    }

    /** Record a local write; the user is never made to wait for the network. */
    suspend fun recordWrite(description: String) {
        store.enqueue(
            PendingOp(
                id = UUID.randomUUID().toString(),
                description = description,
                createdAtMillis = System.currentTimeMillis(),
            )
        )
        if (connectivity.currentlyOnline()) drainQueue()
    }

    private suspend fun drainQueue() {
        val ops = store.pendingOps.first()
        if (ops.isEmpty()) return
        val acknowledged = ops.filter { pushToPlatform(it) }
        if (acknowledged.isNotEmpty()) store.clearOps(acknowledged.map { it.id }.toSet())
    }

    /** Stub for the multi-tenant platform API. Replace with the GoLang client. */
    private suspend fun pushToPlatform(op: PendingOp): Boolean {
        delay(300) // simulated round trip
        return true
    }
}
