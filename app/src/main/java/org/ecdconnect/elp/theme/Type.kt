package org.ecdconnect.elp.theme

import androidx.compose.material3.Typography
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.googlefonts.Font
import androidx.compose.ui.text.googlefonts.GoogleFont
import androidx.compose.ui.unit.sp
import org.ecdconnect.elp.R

/**
 * Type scale from design-system/foundations/typography.md.
 * Quicksand SemiBold = headings + buttons (fixed across tenants),
 * Inter = body/UI text. Downloaded via Google Fonts with system fallback,
 * so first-ever launch with no network still renders (offline-first).
 */
private val fontProvider = GoogleFont.Provider(
    providerAuthority = "com.google.android.gms.fonts",
    providerPackage = "com.google.android.gms",
    certificates = R.array.com_google_android_gms_fonts_certs,
)

val Quicksand = FontFamily(
    Font(GoogleFont("Quicksand"), fontProvider, weight = FontWeight.Medium),
    Font(GoogleFont("Quicksand"), fontProvider, weight = FontWeight.SemiBold),
    Font(GoogleFont("Quicksand"), fontProvider, weight = FontWeight.Bold),
)

val Inter = FontFamily(
    Font(GoogleFont("Inter"), fontProvider, weight = FontWeight.Normal),
    Font(GoogleFont("Inter"), fontProvider, weight = FontWeight.Medium),
    Font(GoogleFont("Inter"), fontProvider, weight = FontWeight.SemiBold),
)

object EcdType {
    val display = TextStyle(fontFamily = Quicksand, fontWeight = FontWeight.SemiBold, fontSize = 28.sp, lineHeight = 36.sp)
    val h1 = TextStyle(fontFamily = Quicksand, fontWeight = FontWeight.SemiBold, fontSize = 24.sp, lineHeight = 32.sp)
    val h2 = TextStyle(fontFamily = Quicksand, fontWeight = FontWeight.SemiBold, fontSize = 20.sp, lineHeight = 28.sp)
    val h3 = TextStyle(fontFamily = Quicksand, fontWeight = FontWeight.SemiBold, fontSize = 18.sp, lineHeight = 24.sp)
    val h4 = TextStyle(fontFamily = Quicksand, fontWeight = FontWeight.SemiBold, fontSize = 16.sp, lineHeight = 22.sp)
    val bodyLarge = TextStyle(fontFamily = Inter, fontWeight = FontWeight.Normal, fontSize = 16.sp, lineHeight = 24.sp)
    val body = TextStyle(fontFamily = Inter, fontWeight = FontWeight.Normal, fontSize = 16.sp, lineHeight = 22.sp)
    val bodySmall = TextStyle(fontFamily = Inter, fontWeight = FontWeight.Normal, fontSize = 14.sp, lineHeight = 20.sp)
    val bodySmallStrong = TextStyle(fontFamily = Inter, fontWeight = FontWeight.SemiBold, fontSize = 14.sp, lineHeight = 20.sp)
    val caption = TextStyle(fontFamily = Inter, fontWeight = FontWeight.Medium, fontSize = 12.sp, lineHeight = 16.sp)
    val button = TextStyle(fontFamily = Quicksand, fontWeight = FontWeight.SemiBold, fontSize = 14.sp, lineHeight = 20.sp)
    val buttonSmall = TextStyle(fontFamily = Quicksand, fontWeight = FontWeight.SemiBold, fontSize = 12.sp, lineHeight = 16.sp)
}

@Composable
fun ecdTypography(): Typography = Typography(
    displaySmall = EcdType.display,
    headlineLarge = EcdType.h1,
    headlineMedium = EcdType.h2,
    headlineSmall = EcdType.h3,
    titleMedium = EcdType.h4,
    bodyLarge = EcdType.bodyLarge,
    bodyMedium = EcdType.body,
    bodySmall = EcdType.bodySmall,
    labelLarge = EcdType.button,
    labelMedium = EcdType.bodySmallStrong,
    labelSmall = EcdType.caption,
)
