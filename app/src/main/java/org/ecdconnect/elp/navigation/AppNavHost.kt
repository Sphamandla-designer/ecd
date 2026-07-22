package org.ecdconnect.elp.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Payments
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import org.ecdconnect.elp.data.AppContainer
import org.ecdconnect.elp.model.Role
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.ui.auth.AuthViewModel
import org.ecdconnect.elp.ui.auth.CreatePinScreen
import org.ecdconnect.elp.ui.auth.OtpScreen
import org.ecdconnect.elp.ui.auth.PhoneScreen
import org.ecdconnect.elp.ui.auth.PinUnlockScreen
import org.ecdconnect.elp.ui.dashboard.DashboardScreen
import org.ecdconnect.elp.ui.dashboard.DashboardViewModel
import org.ecdconnect.elp.ui.loading.LoadingScreen
import org.ecdconnect.elp.ui.placeholder.ComingSoonScreen
import org.ecdconnect.elp.ui.profile.ProfileScreen
import org.ecdconnect.elp.ui.profile.ProfileSetupScreen
import org.ecdconnect.elp.ui.profile.ProfileViewModel

object Routes {
    const val LOADING = "loading"
    const val AUTH_PHONE = "auth/phone"
    const val AUTH_OTP = "auth/otp"
    const val AUTH_PIN_CREATE = "auth/pin/create"
    const val AUTH_PIN_UNLOCK = "auth/pin/unlock"
    const val SETUP = "setup"
    const val HOME = "home"
    const val CLASSES = "classes"
    const val INCOME = "income"
    const val PROFILE = "profile"
}

private class VmFactory(private val container: AppContainer) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T = when {
        modelClass.isAssignableFrom(AuthViewModel::class.java) ->
            AuthViewModel(container.authRepository, container.store) as T
        modelClass.isAssignableFrom(ProfileViewModel::class.java) ->
            ProfileViewModel(container.store, container.syncEngine) as T
        modelClass.isAssignableFrom(DashboardViewModel::class.java) ->
            DashboardViewModel(container.store, container.syncEngine) as T
        else -> throw IllegalArgumentException("Unknown ViewModel $modelClass")
    }
}

@Composable
fun AppNavHost(container: AppContainer) {
    val navController = rememberNavController()
    val factory = VmFactory(container)

    NavHost(navController = navController, startDestination = Routes.LOADING) {

        composable(Routes.LOADING) {
            LoadingScreen(
                container = container,
                onSession = { hasPin, setupComplete ->
                    val target = when {
                        hasPin -> Routes.AUTH_PIN_UNLOCK
                        !setupComplete -> Routes.SETUP
                        else -> Routes.HOME
                    }
                    navController.navigate(target) { popUpTo(Routes.LOADING) { inclusive = true } }
                },
                onNoSession = {
                    navController.navigate(Routes.AUTH_PHONE) { popUpTo(Routes.LOADING) { inclusive = true } }
                },
            )
        }

        composable(Routes.AUTH_PHONE) { entry ->
            val vm: AuthViewModel = viewModel(factory = factory)
            PhoneScreen(
                viewModel = vm,
                appLabel = container.appLabel,
                onCodeSent = { navController.navigate(Routes.AUTH_OTP) },
                onHelp = { /* help/WhatsApp channel lands with support tranche */ },
            )
        }

        composable(Routes.AUTH_OTP) { entry ->
            val parent = remember(entry) { navController.getBackStackEntry(Routes.AUTH_PHONE) }
            val vm: AuthViewModel = viewModel(viewModelStoreOwner = parent, factory = factory)
            OtpScreen(
                viewModel = vm,
                onSignedIn = {
                    navController.navigate(Routes.AUTH_PIN_CREATE) {
                        popUpTo(Routes.AUTH_PHONE) { inclusive = true }
                    }
                },
                onChangeNumber = { navController.popBackStack() },
            )
        }

        composable(Routes.AUTH_PIN_CREATE) {
            val vm: AuthViewModel = viewModel(factory = factory)
            val setupVm: ProfileViewModel = viewModel(factory = factory)
            val setupComplete by setupVm.ui.collectAsState()
            CreatePinScreen(
                viewModel = vm,
                onDone = {
                    val target = if (setupComplete.profile.fullName.isBlank()) Routes.SETUP else Routes.HOME
                    navController.navigate(target) { popUpTo(Routes.AUTH_PIN_CREATE) { inclusive = true } }
                },
            )
        }

        composable(Routes.AUTH_PIN_UNLOCK) {
            val vm: AuthViewModel = viewModel(factory = factory)
            PinUnlockScreen(
                viewModel = vm,
                appLabel = container.appLabel,
                onUnlocked = {
                    navController.navigate(Routes.HOME) { popUpTo(Routes.AUTH_PIN_UNLOCK) { inclusive = true } }
                },
                onForgotPin = {
                    // Forgot PIN -> re-verify with OTP (needs connection).
                    navController.navigate(Routes.AUTH_PHONE) { popUpTo(Routes.AUTH_PIN_UNLOCK) { inclusive = true } }
                },
            )
        }

        composable(Routes.SETUP) {
            val vm: ProfileViewModel = viewModel(factory = factory)
            val phone by container.store.sessionPhone.collectAsState(initial = null)
            ProfileSetupScreen(
                viewModel = vm,
                phone = phone ?: "",
                onDone = {
                    navController.navigate(Routes.HOME) { popUpTo(Routes.SETUP) { inclusive = true } }
                },
            )
        }

        composable(Routes.HOME) { MainShell(container, factory, Routes.HOME, navController) }
        composable(Routes.CLASSES) { MainShell(container, factory, Routes.CLASSES, navController) }
        composable(Routes.INCOME) { MainShell(container, factory, Routes.INCOME, navController) }
        composable(Routes.PROFILE) { MainShell(container, factory, Routes.PROFILE, navController) }
    }
}

/**
 * W4a.7 bottom navigation: Home · Classes · Income (Principal only) · Profile.
 * Icons + labels always — never icon-only, given the audience.
 */
@Composable
private fun MainShell(
    container: AppContainer,
    factory: ViewModelProvider.Factory,
    route: String,
    navController: NavHostController,
) {
    val c = Ecd.colors
    val dashboardVm: DashboardViewModel = viewModel(factory = factory)
    val profileVm: ProfileViewModel = viewModel(factory = factory)
    val ui by dashboardVm.ui.collectAsState()

    val tabs = buildList {
        add(Triple(Routes.HOME, "Home", Icons.Filled.Home))
        add(Triple(Routes.CLASSES, "Classes", Icons.Filled.School))
        if (ui.profile.role == Role.PRINCIPAL) add(Triple(Routes.INCOME, "Income", Icons.Filled.Payments))
        add(Triple(Routes.PROFILE, "Profile", Icons.Filled.Person))
    }

    Scaffold(
        containerColor = c.background,
        bottomBar = {
            NavigationBar(containerColor = c.surface) {
                tabs.forEach { (tabRoute, label, icon) ->
                    NavigationBarItem(
                        selected = route == tabRoute,
                        onClick = {
                            if (route != tabRoute) {
                                navController.navigate(tabRoute) {
                                    popUpTo(Routes.HOME) { saveState = true }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        },
                        icon = { Icon(icon, contentDescription = null) },
                        label = { Text(label, style = EcdType.caption) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = c.primary,
                            selectedTextColor = c.primary,
                            unselectedIconColor = c.textMid,
                            unselectedTextColor = c.textMid,
                            indicatorColor = c.primaryAccent2,
                        ),
                    )
                }
            }
        },
    ) { padding ->
        val content = Modifier.padding(padding)
        when (route) {
            Routes.HOME -> DashboardScreen(
                viewModel = dashboardVm,
                onOpenClass = { navController.navigate(Routes.CLASSES) },
                onOpenProfile = { navController.navigate(Routes.PROFILE) },
                onAddClass = { navController.navigate(Routes.CLASSES) },
                modifier = content,
            )
            Routes.CLASSES -> ComingSoonScreen(
                title = "Classes",
                body = "Class lists and child profiles arrive in the next update. " +
                    "Your classes are safe on this phone.",
                modifier = content,
            )
            Routes.INCOME -> ComingSoonScreen(
                title = "Income",
                body = "Track fees and see who has paid — coming in the next update.",
                modifier = content,
            )
            Routes.PROFILE -> ProfileScreen(viewModel = profileVm, modifier = content)
        }
    }
}
