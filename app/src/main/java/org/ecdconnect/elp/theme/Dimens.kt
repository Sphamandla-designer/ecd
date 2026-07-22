package org.ecdconnect.elp.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.ui.unit.dp

/** Spacing scale — design-system/foundations/layout-spacing.md (4dp base). */
object Space {
    val xs = 4.dp
    val sm = 8.dp
    val md = 12.dp
    val lg = 16.dp   // the workhorse: screen margins, card padding, gaps
    val xl = 24.dp
    val xxl = 32.dp
}

/** Corner radii. */
object Radius {
    val sm = 6.dp    // inputs
    val md = 10.dp   // list rows, small buttons, snackbar
    val lg = 15.dp   // buttons, cards
    val xl = 20.dp   // dialogs, chips
    val xxl = 24.dp  // FAB, icon circles
}

/** Fixed sizes. */
object Sizes {
    val touchTarget = 48.dp
    val inputHeight = 48.dp
    val buttonHeight = 48.dp       // visual 40 in Figma; we keep the full touch height
    val appBar = 64.dp
    val avatarSm = 48.dp
    val iconDefault = 24.dp
    val iconButton = 20.dp
    val iconSmall = 16.dp
    val progressBar = 10.dp
    val nudgeSlotMin = 72.dp       // reserved so layout doesn't jump (spec W4a.4)
}

val EcdShapes = Shapes(
    extraSmall = RoundedCornerShape(Radius.sm),
    small = RoundedCornerShape(Radius.md),
    medium = RoundedCornerShape(Radius.lg),
    large = RoundedCornerShape(Radius.xl),
    extraLarge = RoundedCornerShape(Radius.xxl),
)
