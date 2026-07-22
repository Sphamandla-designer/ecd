package org.ecdconnect.elp.data

import android.content.Context
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import org.ecdconnect.elp.BuildConfig
import org.ecdconnect.elp.theme.TenantColors
import org.ecdconnect.elp.theme.TenantThemeLoader

/** Manual DI — one graph, no framework, easy to swap pieces per tranche. */
class AppContainer(context: Context) {

    val appScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

    val store = LocalStore(context)
    val connectivity = ConnectivityObserver(context)
    val syncEngine = SyncEngine(store, connectivity, appScope)
    val authRepository = AuthRepository(connectivity)

    /**
     * Tenant theme: in-binary fallback per flavor; in production this is refreshed
     * from TENANT.theme_tokens after login and cached, so the app always boots
     * fully branded with zero network.
     */
    val tenantColors: TenantColors = TenantThemeLoader.load(context, BuildConfig.TENANT_ID)
    val tenantId: String = BuildConfig.TENANT_ID
    val appLabel: String = BuildConfig.APP_LABEL
}
