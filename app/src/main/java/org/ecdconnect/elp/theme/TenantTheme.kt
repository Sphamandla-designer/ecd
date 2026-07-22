package org.ecdconnect.elp.theme

import android.content.Context
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * Tenant colour roles — the white-label layer.
 *
 * Spec-role mapping (elpspecs tranche 1 -> design system):
 *   action        -> primary          on-action -> onPrimary
 *   action-soft   -> primaryAccent2
 *   ink-900       -> textDark         ink-700 -> textMid
 *   ink-500/400   -> textLight
 *   surface-0     -> surface          surface-50 -> background
 *   line          -> primaryAccent2 (50% alpha helper below)
 *   success/warning/danger/info -> Status (platform constants, never themed)
 */
@Immutable
data class TenantColors(
    val primary: Color,
    val onPrimary: Color,
    val primaryAccent1: Color,
    val primaryAccent2: Color,
    val secondary: Color,
    val onSecondary: Color,
    val secondaryAccent1: Color,
    val secondaryAccent2: Color,
    val tertiary: Color,
    val onTertiary: Color,
    val tertiaryAccent1: Color,
    val tertiaryAccent2: Color,
    val quaternary: Color,
    val quaternaryAccent2: Color,
    val quinary: Color,
    val quinaryAccent2: Color,
    val textDark: Color,
    val textMid: Color,
    val textLight: Color,
    val background: Color,
    val surface: Color,
    val modalScrim: Color,
) {
    /** Hairline dividers: `line` in the spec. */
    val line: Color get() = primaryAccent2.copy(alpha = 0.5f)
}

/** Platform status colours — identical in every tenant, never themed. */
@Immutable
object Status {
    val errorMain = Color(0xFFED1414)
    val errorDark = Color(0xFFD20000)
    val errorBg = Color(0xFFFFEEF6)
    val alertMain = Color(0xFFFF5C00)
    val alertDark = Color(0xFFE43802)
    val alertBg = Color(0xFFFFEEE4)
    val successMain = Color(0xFF83BB26)
    val successDark = Color(0xFF5A8F02)
    val successBg = Color(0xFFE6F1D4)
    val infoMain = Color(0xFF1D67D5)
    val infoDark = Color(0xFF1752AB)
    val infoBg = Color(0xFFEBF3FF)
}

/** ECD Connect (OA) defaults — the in-binary fallback theme. */
val EcdConnectColors = TenantColors(
    primary = Color(0xFF27385A),
    onPrimary = Color.White,
    primaryAccent1 = Color(0xFF52607B),
    primaryAccent2 = Color(0xFFD3D8E1),
    secondary = Color(0xFFFF2180),
    onSecondary = Color.White,
    secondaryAccent1 = Color(0xFFFF7AB3),
    secondaryAccent2 = Color(0xFFFFD3E6),
    tertiary = Color(0xFF83BB26),
    onTertiary = Color.White,
    tertiaryAccent1 = Color(0xFFA8D45E),
    tertiaryAccent2 = Color(0xFFE6F1D4),
    quaternary = Color(0xFF1DBADF),
    quaternaryAccent2 = Color(0xFFD2F1F9),
    quinary = Color(0xFFFFD525),
    quinaryAccent2 = Color(0xFFFFF6D0),
    textDark = Color(0xFF231F20),
    textMid = Color(0xFF52607B),
    textLight = Color(0xFF9BA3B2),
    background = Color(0xFFF4F6F9),
    surface = Color.White,
    modalScrim = Color(0xB352607B),
)

val LocalTenantColors = staticCompositionLocalOf { EcdConnectColors }

/** Loads a tenant theme from assets/themes/<tenantId>.json (the offline-cached fallback). */
object TenantThemeLoader {
    private val json = Json { ignoreUnknownKeys = true }

    fun load(context: Context, tenantId: String): TenantColors = runCatching {
        val text = context.assets.open("themes/$tenantId.json").bufferedReader().use { it.readText() }
        val colors = json.parseToJsonElement(text).jsonObject["colors"]!!.jsonObject
        fun c(key: String, fallback: Color): Color =
            colors[key]?.jsonPrimitive?.content?.let(::parseHex) ?: fallback

        val d = EcdConnectColors
        TenantColors(
            primary = c("primary", d.primary),
            onPrimary = c("onPrimary", d.onPrimary),
            primaryAccent1 = c("primaryAccent1", d.primaryAccent1),
            primaryAccent2 = c("primaryAccent2", d.primaryAccent2),
            secondary = c("secondary", d.secondary),
            onSecondary = c("onSecondary", d.onSecondary),
            secondaryAccent1 = c("secondaryAccent1", d.secondaryAccent1),
            secondaryAccent2 = c("secondaryAccent2", d.secondaryAccent2),
            tertiary = c("tertiary", d.tertiary),
            onTertiary = c("onTertiary", d.onTertiary),
            tertiaryAccent1 = c("tertiaryAccent1", d.tertiaryAccent1),
            tertiaryAccent2 = c("tertiaryAccent2", d.tertiaryAccent2),
            quaternary = c("quaternary", d.quaternary),
            quaternaryAccent2 = c("quaternaryAccent2", d.quaternaryAccent2),
            quinary = c("quinary", d.quinary),
            quinaryAccent2 = c("quinaryAccent2", d.quinaryAccent2),
            textDark = c("textDark", d.textDark),
            textMid = c("textMid", d.textMid),
            textLight = c("textLight", d.textLight),
            background = c("background", d.background),
            surface = c("surface", d.surface),
            modalScrim = c("modalScrim", d.modalScrim),
        )
    }.getOrDefault(EcdConnectColors)

    private fun parseHex(hex: String): Color {
        val s = hex.removePrefix("#")
        return when (s.length) {
            6 -> Color(0xFF000000 or s.toLong(16))
            8 -> {
                // Design tokens use #RRGGBBAA; Android Color wants ARGB.
                val rgb = s.substring(0, 6).toLong(16)
                val alpha = s.substring(6, 8).toLong(16)
                Color((alpha shl 24) or rgb)
            }
            else -> Color.Black
        }
    }
}

@Composable
fun EcdTheme(
    tenantColors: TenantColors,
    content: @Composable () -> Unit,
) {
    // Material colour scheme kept in sync so Material components inherit tenant colours;
    // app components read LocalTenantColors directly for the full role set.
    val scheme = lightColorScheme(
        primary = tenantColors.primary,
        onPrimary = tenantColors.onPrimary,
        secondary = tenantColors.secondary,
        onSecondary = tenantColors.onSecondary,
        background = tenantColors.background,
        onBackground = tenantColors.textDark,
        surface = tenantColors.surface,
        onSurface = tenantColors.textDark,
        surfaceVariant = tenantColors.background,
        onSurfaceVariant = tenantColors.textMid,
        outline = tenantColors.primaryAccent2,
        error = Status.errorMain,
    )
    CompositionLocalProvider(LocalTenantColors provides tenantColors) {
        MaterialTheme(
            colorScheme = scheme,
            typography = ecdTypography(),
            shapes = EcdShapes,
            content = content,
        )
    }
}

/** Convenience accessor used across the UI. */
object Ecd {
    val colors: TenantColors
        @Composable get() = LocalTenantColors.current
}
