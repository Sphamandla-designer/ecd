package org.ecdconnect.elp.ui.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import org.ecdconnect.elp.data.LocalStore
import org.ecdconnect.elp.data.SyncEngine
import org.ecdconnect.elp.model.ClassRoom
import org.ecdconnect.elp.model.NeedsAttentionItem
import org.ecdconnect.elp.model.Profile
import org.ecdconnect.elp.model.Role
import org.ecdconnect.elp.model.SyncState

/**
 * W4a — "what do I need to do today?".
 * Practitioner and Principal share the layout; Principal adds staff/income blocks.
 */
class DashboardViewModel(
    private val store: LocalStore,
    private val sync: SyncEngine,
) : ViewModel() {

    data class DashboardUi(
        val loading: Boolean = true,
        val profile: Profile = Profile(),
        val classes: List<ClassRoom> = emptyList(),
        val isPrincipal: Boolean = false,
        val attendanceAllDone: Boolean = false,
        val needsAttention: List<NeedsAttentionItem> = emptyList(),
        val nudge: String? = null,
        val syncState: SyncState = SyncState.SYNCED,
        val showOfflineReassurance: Boolean = false,
    )

    private val dismissedNudge = MutableStateFlow(false)

    val ui: StateFlow<DashboardUi> = combine(
        store.profile, store.classes, sync.syncState, store.offlineNoticeShown, dismissedNudge,
    ) { profile, classes, syncState, offlineNoticeShown, nudgeDismissed ->
        val p = profile ?: Profile()
        DashboardUi(
            loading = false,
            profile = p,
            classes = classes,
            isPrincipal = p.role == Role.PRINCIPAL,
            attendanceAllDone = classes.isNotEmpty() && classes.all { it.attendanceDoneToday },
            needsAttention = deriveNeedsAttention(p, classes),
            // One nudge at a time (assumption A5); Kenkai SDK plugs in here later.
            nudge = if (nudgeDismissed) null else defaultNudge(p, classes),
            syncState = syncState,
            showOfflineReassurance = syncState == SyncState.OFFLINE && !offlineNoticeShown,
        )
    }.stateIn(viewModelScope, SharingStarted.Eagerly, DashboardUi())

    /** Derived, specific, actionable — never generic warnings. */
    private fun deriveNeedsAttention(profile: Profile, classes: List<ClassRoom>): List<NeedsAttentionItem> {
        val items = mutableListOf<NeedsAttentionItem>()
        if (profile.idNumber == null && profile.fullName.isNotBlank()) {
            items += NeedsAttentionItem("profile.id", "Your profile needs an ID number so you can be approved")
        }
        classes.filter { it.childCount == 0 }.forEach {
            items += NeedsAttentionItem("class.${it.id}", "${it.name} has no children registered yet")
        }
        return items
    }

    private fun defaultNudge(profile: Profile, classes: List<ClassRoom>): String? = when {
        classes.isEmpty() -> null // the empty state already directs the user
        profile.email == null -> "Tip: add an email to your profile to get a monthly summary of your classes."
        else -> null
    }

    fun dismissNudge() {
        dismissedNudge.value = true
    }

    fun markOfflineReassuranceSeen() {
        viewModelScope.launch { store.markOfflineNoticeShown() }
    }

    /** Attendance capture is next tranche (W6); this local-first stub keeps the loop honest. */
    fun takeAttendance() {
        viewModelScope.launch {
            val classes = store.classes.first()
            store.saveClasses(classes.map { it.copy(attendanceDoneToday = true) })
            sync.recordWrite("attendance.take")
        }
    }
}
