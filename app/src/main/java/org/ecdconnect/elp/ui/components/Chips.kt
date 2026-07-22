package org.ecdconnect.elp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.CloudOff
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import org.ecdconnect.elp.model.SyncState
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.theme.Status

/**
 * Ambient sync chip (spec W4a.1): Synced / Pending / Offline.
 * Calm, always visible, never alarming — solid small pill, caption text.
 */
@Composable
fun SyncChip(state: SyncState, modifier: Modifier = Modifier, onDarkHeader: Boolean = false) {
    val (label, icon, bg, fg) = when (state) {
        SyncState.SYNCED -> ChipSpec("Synced", Icons.Filled.CheckCircle, Status.successMain, Color.White)
        SyncState.PENDING -> ChipSpec("Saving…", Icons.Filled.Schedule, Status.alertMain, Color.White)
        SyncState.OFFLINE -> ChipSpec("Offline", Icons.Filled.CloudOff, Status.errorMain, Color.White)
    }
    Pill(label = label, icon = icon, background = bg, contentColor = fg, modifier = modifier)
}

/** Small status pill — offline pill anatomy from the design system (24dp, radius-full). */
@Composable
fun Pill(
    label: String,
    background: Color,
    contentColor: Color,
    modifier: Modifier = Modifier,
    icon: androidx.compose.ui.graphics.vector.ImageVector? = null,
) {
    Row(
        modifier = modifier
            .background(background, CircleShape)
            .padding(horizontal = Space.sm, vertical = Space.xs),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        if (icon != null) {
            Icon(icon, contentDescription = null, tint = contentColor, modifier = Modifier.size(14.dp))
            Spacer(Modifier.width(Space.xs))
        }
        Text(label, style = EcdType.caption, color = contentColor)
    }
}

/** "Pending" chip on locally changed sections (spec W3 offline state). */
@Composable
fun PendingChip(modifier: Modifier = Modifier) {
    Pill(
        label = "Saved on phone",
        icon = Icons.Filled.Schedule,
        background = Status.alertBg,
        contentColor = Status.alertDark,
        modifier = modifier,
    )
}

/** "Needs attention" chip for incomplete sections (spec W3 incomplete state). */
@Composable
fun NeedsAttentionChip(modifier: Modifier = Modifier) {
    Pill(
        label = "Needs attention",
        background = Status.alertBg,
        contentColor = Status.alertDark,
        modifier = modifier,
    )
}

/** Role chip on the profile header. */
@Composable
fun RoleChip(text: String, modifier: Modifier = Modifier) {
    val c = Ecd.colors
    Pill(label = text, background = c.secondaryAccent2, contentColor = c.textDark, modifier = modifier)
}

private data class ChipSpec(
    val label: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector,
    val bg: Color,
    val fg: Color,
)
