# Implementing on Android (Jetpack Compose)

The ELP app in [`app/`](../../app) is Kotlin + Compose + Material3 with a runtime tenant-theming
layer. This guide maps the design system onto it so a screen built from these tokens renders
pixel-identically to Figma.

---

## 1. Wire the tokens

The theme layer already exists in `app/src/main/java/org/ecdconnect/elp/theme/`. Three things
must be true:

1. **`TenantColors` carries every role**, not just Material's slots. Material3's
   `ColorScheme` has no concept of `select`, `actionSubtle` or `appBarMuted`, so the system is
   exposed through its own `CompositionLocal` and Material3 is fed a derived scheme for the few
   built-in components used.
2. **Values come from `design-system/tokens/themes/<tenant>.json`**, parsed at startup and
   cached offline. The in-binary `EcdConnectColors` is the fallback.
3. **Roles resolve through palette keys** — the theme JSON says `"action": "quaternary"`, so
   the loader looks `quaternary` up in `palette` and assigns it to `action`.

```kotlin
@Immutable
data class TenantColors(
    // action
    val action: Color, val onAction: Color,
    val actionHover: Color, val actionDisabled: Color, val actionSubtle: Color,
    // selection
    val select: Color, val onSelect: Color, val selectSubtle: Color,
    // chrome
    val appBar: Color, val onAppBar: Color, val appBarMuted: Color,
    // surfaces
    val background: Color, val surface: Color, val line: Color,
    // text
    val textDark: Color, val textMid: Color, val textLight: Color,
    val scrim: Color,
)

val LocalTenantColors = staticCompositionLocalOf { EcdConnectColors }

/** Platform constants — never themed. */
object Status {
    val errorMain = Color(0xFFED1414); val errorDark = Color(0xFFD20000); val errorBg = Color(0xFFFFEEF6)
    val alertMain = Color(0xFFFF5C00); val alertDark = Color(0xFFE43802); val alertBg = Color(0xFFFFEEE4)
    val successMain = Color(0xFF83BB26); val successDark = Color(0xFF5A8F02); val successBg = Color(0xFFE6F1D4)
    val infoMain = Color(0xFF1D67D5); val infoDark = Color(0xFF1752AB); val infoBg = Color(0xFFEBF3FF)

    // Title tone for small bold text on a *Bg fill. Alert/banner titles are 14 sp
    // SemiBold — below the WCAG large-text threshold — so they need 4.5:1.
    // *Dark clears it for error and info but not for alert (3.8:1) or success (3.3:1).
    // Text only: never a fill, border or icon.
    val errorTitle = errorDark                  // 5.72:1
    val infoTitle = infoDark                    // 6.94:1
    val alertTitle = Color(0xFFC23002)          // 4.62:1
    val successTitle = Color(0xFF487202)        // 4.71:1
}

/** Developmental domains — never themed. */
object Domain {
    val happyAndSecure = Color(0xFFD3276C)
    val speakingListening = Color(0xFF9E4D8E)
    val discoveryProblem = Color(0xFF6974AF)
    val developingBodies = Color(0xFF359AD1)
}
```

**The ECD Connect defaults** (these must match `themes/ecd-connect.json` exactly):

```kotlin
val EcdConnectColors = TenantColors(
    action = Color(0xFF1DBADF), onAction = Color.White,
    actionHover = Color(0xFF8EDCEF), actionDisabled = Color(0xFFD2F1F9),
    actionSubtle = Color(0xFFD2F1F9),
    select = Color(0xFFFF2180), onSelect = Color.White,
    selectSubtle = Color(0xFFFFD3E6),
    appBar = Color(0xFF27385A), onAppBar = Color.White,
    appBarMuted = Color(0xFF52607B),
    background = Color(0xFFEFF6FA), surface = Color.White,
    line = Color(0xFFD4D7DE),
    textDark = Color(0xFF27385A), textMid = Color(0xFF65727A),
    textLight = Color(0xFFC9CFD2),
    scrim = Color(0xFF27385A).copy(alpha = 0.7f),
)
```

> ⚠️ If you are updating an existing build: `primaryAccent2` was `#D3D8E1` and `background`
> was `#F4F6F9`. Both are wrong. The correct values are `#D4D7DE` and `#EFF6FA`.

---

## 2. Type

```kotlin
private val Quicksand = FontFamily(/* GoogleFont("Quicksand"), weights 500, 600 */)
private val Inter     = FontFamily(/* GoogleFont("Inter"), weights 400, 500, 600 */)

@Immutable
data class EcdTypography(
    val h1: TextStyle, val h2: TextStyle, val h3: TextStyle, val h4: TextStyle,
    val body: TextStyle, val bodyTight: TextStyle, val bodyMedium: TextStyle,
    val help: TextStyle, val helpMedium: TextStyle, val helpStrong: TextStyle,
    val caption: TextStyle, val captionMedium: TextStyle, val overline: TextStyle,
    val button: TextStyle, val buttonSmall: TextStyle, val buttonFab: TextStyle,
    val chip: TextStyle, val chipActive: TextStyle,
)

val EcdType = EcdTypography(
    h1  = TextStyle(Quicksand, FontWeight.SemiBold, 24.sp, lineHeight = 32.sp),
    h2  = TextStyle(Quicksand, FontWeight.SemiBold, 20.sp, lineHeight = 28.sp),
    h3  = TextStyle(Quicksand, FontWeight.SemiBold, 18.sp, lineHeight = 24.sp),
    h4  = TextStyle(Quicksand, FontWeight.SemiBold, 16.sp, lineHeight = 22.sp),
    body       = TextStyle(Inter, FontWeight.Normal,   16.sp, lineHeight = 24.sp),
    bodyTight  = TextStyle(Inter, FontWeight.Normal,   16.sp, lineHeight = 22.sp),
    bodyMedium = TextStyle(Inter, FontWeight.Medium,   16.sp, lineHeight = 22.sp),
    help       = TextStyle(Inter, FontWeight.Normal,   14.sp, lineHeight = 20.sp),
    helpMedium = TextStyle(Inter, FontWeight.Medium,   14.sp, lineHeight = 20.sp),
    helpStrong = TextStyle(Inter, FontWeight.SemiBold, 14.sp, lineHeight = 20.sp),
    caption       = TextStyle(Inter, FontWeight.Normal, 12.sp, lineHeight = 16.sp),
    captionMedium = TextStyle(Inter, FontWeight.Medium, 12.sp, lineHeight = 16.sp),
    overline = TextStyle(Inter, FontWeight.SemiBold, 12.sp, lineHeight = 16.sp,
                         letterSpacing = 2.5.sp),
    button      = TextStyle(Quicksand, FontWeight.SemiBold, 14.sp, lineHeight = 20.sp),
    buttonSmall = TextStyle(Quicksand, FontWeight.SemiBold, 12.sp, lineHeight = 16.sp),
    buttonFab   = TextStyle(Quicksand, FontWeight.SemiBold, 16.sp, lineHeight = 22.sp),
    chip        = TextStyle(Quicksand, FontWeight.Medium,   14.sp, lineHeight = 16.sp),
    chipActive  = TextStyle(Quicksand, FontWeight.SemiBold, 14.sp, lineHeight = 16.sp),
)
```

Bundle both font families as fallbacks — the app is offline-first and must not cold-start with
system defaults.

---

## 3. Dimensions

```kotlin
object Space { val xs = 4.dp; val sm = 8.dp; val md = 12.dp
               val lg = 16.dp; val xl = 24.dp; val xxl = 32.dp }

object Radius { val xs = 2.dp; val alertButton = 4.dp; val sm = 6.dp; val md = 10.dp
                val lg = 15.dp        // full-width buttons — 15, not 16
                val xl = 20.dp        // dialogs, chips
                val xxl = 24.dp }     // FAB, icon circles

object Sizes {
    val screenMargin = 16.dp
    val contentWidth = 328.dp     // reference only — see §7 on responsiveness
    val touchTarget  = 48.dp
    val appBar = 64.dp; val tabBar = 56.dp; val filterBar = 56.dp
    val languageSelector = 74.dp; val footerBar = 72.dp
    val buttonHeight = 40.dp      // VISUAL — wrap in 48.dp touch target
    val buttonSmall = 32.dp; val fab = 48.dp
    val inputHeight = 48.dp; val textarea = 120.dp
    val chipHeight = 40.dp; val filterItem = 48.dp
    val badge = 28.dp; val iconCircle = 48.dp
    val rowDefault = 80.dp; val rowLong = 92.dp; val rowCompact = 56.dp
}
```

---

## 4. Core components

### Primary / secondary button

```kotlin
@Composable
fun EcdPrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    loading: Boolean = false,
    leadingIcon: ImageVector? = null,
) {
    val c = LocalTenantColors.current
    val fill = when {
        !enabled -> c.actionDisabled
        loading  -> c.actionHover
        else     -> c.action
    }
    Box(
        modifier
            .fillMaxWidth()
            .heightIn(min = Sizes.touchTarget)   // 48 dp touch, 40 dp visual
            .wrapContentHeight(),
        contentAlignment = Alignment.Center,
    ) {
        Row(
            Modifier
                .fillMaxWidth()
                .height(Sizes.buttonHeight)
                // shadow ONLY when enabled — disabled has none
                .then(if (enabled) Modifier.shadow(
                    elevation = 10.dp, shape = RoundedCornerShape(Radius.lg),
                    ambientColor = Color(0xFF27385A), spotColor = Color(0xFF27385A),
                ) else Modifier)
                .clip(RoundedCornerShape(Radius.lg))
                .background(fill)
                .clickable(enabled = enabled && !loading, onClick = onClick)
                .padding(horizontal = 17.dp, vertical = 10.dp),   // 17 is deliberate
            horizontalArrangement = Arrangement.spacedBy(Space.sm, Alignment.CenterHorizontally),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            if (loading) CircularProgressIndicator(Modifier.size(16.dp), color = c.onAction, strokeWidth = 2.dp)
            else leadingIcon?.let { Icon(it, null, Modifier.size(20.dp), tint = c.onAction) }
            Text(text, style = EcdType.button, color = c.onAction)
        }
    }
}
```

The secondary button is the same geometry with `Modifier.border(2.dp, borderColour,
RoundedCornerShape(Radius.lg))`, a `surface` fill, an `action`-coloured label and **no shadow**.

### Text field

```kotlin
@Composable
fun EcdTextField(
    value: String, onValueChange: (String) -> Unit,
    label: String, helpText: String? = null, errorText: String? = null,
    enabled: Boolean = true, trailingIcon: ImageVector? = null,
) {
    val c = LocalTenantColors.current
    var focused by remember { mutableStateOf(false) }
    val isError = errorText != null

    Column(verticalArrangement = Arrangement.spacedBy(Space.xs)) {
        Text(label, style = EcdType.h4, color = c.textDark)
        helpText?.let { Text(it, style = EcdType.help, color = c.textMid) }

        // The focus signal is an INVERSION: tinted fill → white + 2 dp ring
        val fill   = if (focused || isError) c.surface else c.background
        val border = when { isError -> Status.errorMain; focused -> c.action; else -> null }

        BasicTextField(
            value = value, onValueChange = onValueChange, enabled = enabled, singleLine = true,
            textStyle = EcdType.bodyTight.copy(
                color = if (isError) Status.errorDark else c.textDark),
            cursorBrush = SolidColor(c.textDark),
            modifier = Modifier
                .fillMaxWidth().height(Sizes.inputHeight)
                .clip(RoundedCornerShape(Radius.sm))
                .background(fill)
                .then(border?.let {
                    Modifier.border(2.dp, it, RoundedCornerShape(Radius.sm)) } ?: Modifier)
                .onFocusChanged { focused = it.isFocused }
                // 16 resting, 14 when the 2 dp border eats 2 dp
                .padding(horizontal = if (focused || isError) 14.dp else 16.dp),
            decorationBox = { inner ->
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(Modifier.weight(1f)) { inner() }
                    trailingIcon?.let {
                        Icon(it, null, Modifier.size(20.dp), tint = c.textMid) }
                }
            },
        )
        errorText?.let { Text(it, style = EcdType.help, color = Status.errorDark) }
    }
}
```

### List row (`action item icon`, 80 dp)

```kotlin
@Composable
fun EcdActionItem(
    title: String, subtitle: String? = null,
    iconCircleColour: Color, icon: ImageVector,
    badge: (@Composable () -> Unit)? = null,
    onClick: () -> Unit,
) {
    val c = LocalTenantColors.current
    Row(
        Modifier.fillMaxWidth().heightIn(min = Sizes.rowDefault)   // min, so it grows with font scale
            .clip(RoundedCornerShape(Radius.md))
            .background(c.background)
            .clickable(onClick = onClick)
            .padding(Space.lg),
        horizontalArrangement = Arrangement.spacedBy(Space.lg),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(Modifier.size(Sizes.iconCircle).clip(CircleShape).background(iconCircleColour),
            contentAlignment = Alignment.Center) {
            Icon(icon, null, Modifier.size(22.dp), tint = c.onAction)
        }
        Column(Modifier.weight(1f)) {
            Text(title, style = EcdType.h4, color = c.textDark)
            subtitle?.let { Text(it, style = EcdType.help, color = c.textMid) }
        }
        badge?.invoke()
        Icon(Icons.Outlined.ChevronRight, null, Modifier.size(24.dp), tint = c.textMid)
    }
}
```

### Alert

```kotlin
enum class AlertKind { Error, Warning, Success, Info }

@Composable
fun EcdAlert(kind: AlertKind, title: String, body: String? = null,
             onDismiss: (() -> Unit)? = null) {
    val c = LocalTenantColors.current
    val (bg, dark, icon) = when (kind) {
        AlertKind.Error   -> Triple(Status.errorBg,   Status.errorDark,   Icons.Filled.Cancel)
        AlertKind.Warning -> Triple(Status.alertBg,   Status.alertDark,   Icons.Filled.Error)
        AlertKind.Success -> Triple(Status.successBg, Status.successDark, Icons.Filled.CheckCircle)
        AlertKind.Info    -> Triple(Status.infoBg,    Status.infoDark,    Icons.Filled.Info)
    }
    Row(
        Modifier.fillMaxWidth().clip(RoundedCornerShape(Radius.md))
            .background(bg).padding(Space.lg),
        horizontalArrangement = Arrangement.spacedBy(Space.md),
    ) {
        Icon(icon, null, Modifier.size(20.dp), tint = dark)
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(Space.sm)) {
            Text(title, style = EcdType.helpStrong, color = dark)
            // body is textDark, NOT the status colour
            body?.let { Text(it, style = EcdType.help, color = c.textDark) }
        }
        onDismiss?.let {
            Icon(Icons.Outlined.Close, "Dismiss",
                 Modifier.size(22.dp).clickable(onClick = it), tint = dark)
        }
    }
}
```

---

## 5. Screen scaffold

```kotlin
@Composable
fun EcdScreen(
    title: String, subtitle: String? = null,
    onBack: (() -> Unit)? = null, onClose: (() -> Unit)? = null,
    onHelp: (() -> Unit)? = null,
    tabs: (@Composable () -> Unit)? = null,
    filterBar: (@Composable () -> Unit)? = null,
    footer: (@Composable () -> Unit)? = null,
    content: @Composable ColumnScope.() -> Unit,
) {
    val c = LocalTenantColors.current
    Column(Modifier.fillMaxSize().background(c.surface)) {
        EcdAppBar(title, subtitle, onBack, onClose, onHelp)   // 64 dp, c.appBar
        tabs?.invoke()                                        // 56 dp
        filterBar?.invoke()                                   // 56 dp
        OfflineTicker()                                       // reserved slot, see offline-first.md
        Column(
            Modifier.weight(1f).verticalScroll(rememberScrollState())
                .padding(horizontal = Sizes.screenMargin),
            content = content,
        )
        footer?.let {
            Column {
                HorizontalDivider(color = c.line)             // full-width, breaks the margin
                Box(Modifier.padding(Sizes.screenMargin)) { it() }
            }
        }
    }
}
```

---

## 6. Dialogs

```kotlin
@Composable
fun EcdDialog(
    onDismiss: () -> Unit,
    icon: @Composable () -> Unit,                 // 48 dp status circle or 96 dp mascot
    title: String, body: String? = null,
    primary: (@Composable () -> Unit)? = null,
    secondary: (@Composable () -> Unit)? = null,
) {
    val c = LocalTenantColors.current
    Dialog(onDismissRequest = onDismiss,
           properties = DialogProperties(usePlatformDefaultWidth = false)) {
        Column(
            Modifier.width(328.dp)
                .shadow(20.dp, RoundedCornerShape(Radius.xl))
                .clip(RoundedCornerShape(Radius.xl))
                .background(c.surface)
                .padding(horizontal = 16.dp, vertical = 24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(Space.lg),
        ) {
            icon()
            Text(title, style = EcdType.h3, color = c.textDark, textAlign = TextAlign.Center)
            body?.let { Text(it, style = EcdType.body, color = c.textMid,
                             textAlign = TextAlign.Center) }
            primary?.invoke()     // 296 dp wide
            secondary?.invoke()
        }
    }
}
```

Set the scrim to `c.scrim` via the dialog window, not a `Box` overlay, so it composites over
the system bars.

---

## 7. Responsiveness

`contentWidth = 328.dp` is a **reference measurement, not a layout constraint**. Use
`fillMaxWidth()` inside a 16 dp horizontal padding so the column grows on wider phones. Only
cap it on tablets:

```kotlin
val maxContent = if (windowWidthDp >= 600) 600.dp else Dp.Unspecified
Modifier.widthIn(max = maxContent).align(Alignment.CenterHorizontally)
```

Dialogs stay 328 dp at every size.

---

## 8. Accessibility checklist

- Every tappable element ≥ 48 dp (`heightIn(min = Sizes.touchTarget)`), even when the visual is
  40 or 32 dp.
- Icon-only buttons (search, calendar, help, dismiss) need a real `contentDescription`;
  icons beside a label take `null`.
- Never `maxLines = 1` on user-supplied names except class names, where the designer asks for
  ellipsis.
- Test at 200 % font scale — row heights are minimums, not fixed heights.
- Disabled primaries fail contrast; always pair with visible helper text.
- Announce offline/sync state changes with `Modifier.semantics { liveRegion = Polite }`.

---

## 9. Verifying against Figma

1. Run the screen in a **360 × 640 mdpi** emulator — that is the design frame exactly.
2. Screenshot it and overlay the Figma node (deep-link in the relevant
   [`screens/`](../screens/) doc).
3. Check in this order: **band heights** (64/56/74/72) → **margins** (16) → **radii**
   (15 on buttons, 10 on cards, 6 on inputs, 20 on dialogs) → **type** (Quicksand vs Inter) →
   **colour roles**.
4. The most common failures, in order: navy instead of cyan primary buttons; radius 16 instead
   of 15; body text taking the status colour inside an alert; missing shadow on the primary
   button; disabled state keeping the shadow.
