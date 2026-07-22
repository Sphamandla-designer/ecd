package org.ecdconnect.elp.ui.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import org.ecdconnect.elp.data.LocalStore
import org.ecdconnect.elp.data.SyncEngine
import org.ecdconnect.elp.model.ClassRoom
import org.ecdconnect.elp.model.Profile
import org.ecdconnect.elp.model.Role
import org.ecdconnect.elp.model.SyncState
import java.util.UUID

/**
 * W3 — scaffolded profile. First-run captures the absolute minimum (name, role,
 * site, one class); everything else is added later via one specific next action.
 * All writes are local-first and queued for sync.
 */
class ProfileViewModel(
    private val store: LocalStore,
    private val sync: SyncEngine,
) : ViewModel() {

    data class ProfileUi(
        val profile: Profile = Profile(),
        val classes: List<ClassRoom> = emptyList(),
        val completeness: Int = 0,
        val nextAction: String? = null,
        val syncState: SyncState = SyncState.SYNCED,
        val pendingSections: Boolean = false,
        val cardDismissed: Boolean = false,
    )

    private val cardDismissed = MutableStateFlow(false)

    val ui: StateFlow<ProfileUi> = combine(
        store.profile, store.classes, sync.syncState, store.pendingOps, cardDismissed,
    ) { profile, classes, syncState, ops, dismissed ->
        val p = profile ?: Profile()
        ProfileUi(
            profile = p,
            classes = classes,
            completeness = p.completeness(classes.isNotEmpty()),
            nextAction = p.nextAction(classes.isNotEmpty()),
            syncState = syncState,
            pendingSections = ops.isNotEmpty(),
            cardDismissed = dismissed,
        )
    }.stateIn(viewModelScope, SharingStarted.Eagerly, ProfileUi())

    fun dismissCompletenessCard() {
        // Dismissible, reappears later (next session). Never blocks.
        cardDismissed.value = true
    }

    /** First-run setup: one save, minimal fields, sync queued. */
    fun completeSetup(
        fullName: String,
        role: Role,
        siteName: String,
        className: String,
        phone: String,
        onDone: () -> Unit,
    ) {
        viewModelScope.launch {
            store.saveProfile(Profile(fullName = fullName.trim(), role = role, siteName = siteName.trim(), phone = phone))
            if (className.isNotBlank()) {
                store.saveClasses(listOf(ClassRoom(id = UUID.randomUUID().toString(), name = className.trim(), childCount = 0)))
            }
            store.markSetupComplete()
            sync.recordWrite("profile.setup")
            onDone()
        }
    }

    fun updateField(update: (Profile) -> Profile, description: String) {
        viewModelScope.launch {
            val current = store.profile.first() ?: Profile()
            store.saveProfile(update(current))
            sync.recordWrite(description)
        }
    }

    fun addClass(name: String) {
        viewModelScope.launch {
            val current = store.classes.first()
            store.saveClasses(current + ClassRoom(id = UUID.randomUUID().toString(), name = name.trim()))
            sync.recordWrite("class.add")
        }
    }
}
