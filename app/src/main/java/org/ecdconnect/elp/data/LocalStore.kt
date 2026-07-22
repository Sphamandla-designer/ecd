package org.ecdconnect.elp.data

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import org.ecdconnect.elp.model.ClassRoom
import org.ecdconnect.elp.model.PendingOp
import org.ecdconnect.elp.model.Profile

private val Context.dataStore by preferencesDataStore(name = "elp_local")

/**
 * Local-first store. Every write lands here synchronously from the user's point of
 * view; the SyncEngine drains the pending-op queue to the platform when online.
 *
 * DataStore+JSON is deliberate for tranche 1 (profile, classes, session, queue are
 * small documents). Attendance/registration tranches swap the classroom collections
 * to Room behind the same repository interfaces.
 */
class LocalStore(private val context: Context) {

    private val json = Json { ignoreUnknownKeys = true }

    private object Keys {
        val sessionPhone = stringPreferencesKey("session_phone")
        val pin = stringPreferencesKey("pin")
        val profile = stringPreferencesKey("profile")
        val classes = stringPreferencesKey("classes")
        val pendingOps = stringPreferencesKey("pending_ops")
        val setupComplete = booleanPreferencesKey("setup_complete")
        val offlineNoticeShown = booleanPreferencesKey("offline_notice_shown")
        val pinPromptShown = booleanPreferencesKey("pin_prompt_shown")
    }

    // --- Session (A3: long-lived; offline never forces re-login) ---

    val sessionPhone: Flow<String?> = context.dataStore.data.map { it[Keys.sessionPhone] }

    suspend fun saveSession(phone: String) =
        context.dataStore.edit { it[Keys.sessionPhone] = phone }

    suspend fun clearSession() = context.dataStore.edit {
        it.remove(Keys.sessionPhone)
        it.remove(Keys.pin)
    }

    // --- PIN (W2c proposal: local PIN unlocks offline) ---

    val pin: Flow<String?> = context.dataStore.data.map { it[Keys.pin] }
    val pinPromptShown: Flow<Boolean> = context.dataStore.data.map { it[Keys.pinPromptShown] ?: false }

    suspend fun savePin(pin: String) = context.dataStore.edit { it[Keys.pin] = pin }
    suspend fun markPinPromptShown() = context.dataStore.edit { it[Keys.pinPromptShown] = true }

    // --- Profile & classes ---

    val profile: Flow<Profile?> = context.dataStore.data.map { prefs ->
        prefs[Keys.profile]?.let { runCatching { json.decodeFromString(Profile.serializer(), it) }.getOrNull() }
    }

    val classes: Flow<List<ClassRoom>> = context.dataStore.data.map { prefs ->
        prefs[Keys.classes]?.let {
            runCatching { json.decodeFromString(ListSerializer(ClassRoom.serializer()), it) }.getOrNull()
        } ?: emptyList()
    }

    val setupComplete: Flow<Boolean> = context.dataStore.data.map { it[Keys.setupComplete] ?: false }

    suspend fun saveProfile(profile: Profile) =
        context.dataStore.edit { it[Keys.profile] = json.encodeToString(Profile.serializer(), profile) }

    suspend fun saveClasses(classes: List<ClassRoom>) =
        context.dataStore.edit { it[Keys.classes] = json.encodeToString(ListSerializer(ClassRoom.serializer()), classes) }

    suspend fun markSetupComplete() = context.dataStore.edit { it[Keys.setupComplete] = true }

    // --- Sync queue ---

    val pendingOps: Flow<List<PendingOp>> = context.dataStore.data.map { prefs ->
        prefs[Keys.pendingOps]?.let {
            runCatching { json.decodeFromString(ListSerializer(PendingOp.serializer()), it) }.getOrNull()
        } ?: emptyList()
    }

    suspend fun enqueue(op: PendingOp) = context.dataStore.edit { prefs ->
        val current = prefs[Keys.pendingOps]?.let {
            runCatching { json.decodeFromString(ListSerializer(PendingOp.serializer()), it) }.getOrNull()
        } ?: emptyList()
        prefs[Keys.pendingOps] = json.encodeToString(ListSerializer(PendingOp.serializer()), current + op)
    }

    suspend fun clearOps(ids: Set<String>) = context.dataStore.edit { prefs ->
        val current = prefs[Keys.pendingOps]?.let {
            runCatching { json.decodeFromString(ListSerializer(PendingOp.serializer()), it) }.getOrNull()
        } ?: emptyList()
        prefs[Keys.pendingOps] =
            json.encodeToString(ListSerializer(PendingOp.serializer()), current.filterNot { it.id in ids })
    }

    // --- One-time offline reassurance (spec W4a: "Do not repeat it every time") ---

    val offlineNoticeShown: Flow<Boolean> = context.dataStore.data.map { it[Keys.offlineNoticeShown] ?: false }
    suspend fun markOfflineNoticeShown() = context.dataStore.edit { it[Keys.offlineNoticeShown] = true }
}
