package org.ecdconnect.elp.model

import kotlinx.serialization.Serializable

@Serializable
enum class Role { PRACTITIONER, PRINCIPAL }

@Serializable
data class Profile(
    val fullName: String = "",
    val role: Role = Role.PRACTITIONER,
    val siteName: String = "",
    val phone: String = "",
    val idNumber: String? = null,
    val email: String? = null,
) {
    /**
     * Completeness drives the W3 completeness card. Derived, never asked twice.
     * First-run capture (name, role, site, class) counts 60%; the rest builds to 100%.
     */
    fun completeness(hasClass: Boolean): Int {
        var score = 0
        if (fullName.isNotBlank()) score += 20
        score += 10 // role always chosen at setup
        if (siteName.isNotBlank()) score += 20
        if (hasClass) score += 10
        if (idNumber != null) score += 25
        if (email != null) score += 15
        return score.coerceAtMost(100)
    }

    /** One specific next action, not a list of everything missing (spec W3). */
    fun nextAction(hasClass: Boolean): String? = when {
        fullName.isBlank() -> "Add your name so people know who you are"
        siteName.isBlank() -> "Add your site so your work is linked to it"
        !hasClass -> "Add your first class to start taking attendance"
        idNumber == null -> "Add your ID number so you can be approved"
        email == null -> "Add an email so you can get your reports"
        else -> null
    }
}

@Serializable
data class ClassRoom(
    val id: String,
    val name: String,
    val childCount: Int = 0,
    val attendanceDoneToday: Boolean = false,
)

/** A locally queued write waiting for the platform (plan §7 offline sync). */
@Serializable
data class PendingOp(
    val id: String,
    val description: String,
    val createdAtMillis: Long,
)

/** Ambient sync state shown by the dashboard chip (spec W4a.1). */
enum class SyncState { SYNCED, PENDING, OFFLINE }

data class NeedsAttentionItem(
    val id: String,
    val message: String,
)
