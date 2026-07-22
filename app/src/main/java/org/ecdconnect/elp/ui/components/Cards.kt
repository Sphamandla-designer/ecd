package org.ecdconnect.elp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Radius
import org.ecdconnect.elp.theme.Sizes
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.theme.Status

/** Plain surface card — radius-lg, surface fill, 16dp padding. */
@Composable
fun SectionCard(
    modifier: Modifier = Modifier,
    onClick: (() -> Unit)? = null,
    content: @Composable Column.() -> Unit,
) {
    val c = Ecd.colors
    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(c.surface, RoundedCornerShape(Radius.lg))
            .let { if (onClick != null) it.clickable(onClick = onClick) else it }
            .padding(Space.lg),
        content = content,
    )
}

/**
 * List/action row from the design system §6: 48dp colour-circle icon,
 * h4 title + bodySmall subtitle, trailing chevron or custom slot. Min 48dp touch.
 */
@Composable
fun ListRow(
    title: String,
    subtitle: String?,
    icon: ImageVector,
    iconTint: Color,
    onClick: (() -> Unit)?,
    modifier: Modifier = Modifier,
    trailing: (@Composable () -> Unit)? = null,
) {
    val c = Ecd.colors
    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(c.surface, RoundedCornerShape(Radius.md))
            .let { if (onClick != null) it.clickable(onClick = onClick) else it }
            .padding(Space.lg)
            .defaultMinSize(minHeight = Sizes.touchTarget),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(
            modifier = Modifier.size(Sizes.avatarSm).background(iconTint, CircleShape),
            contentAlignment = Alignment.Center,
        ) {
            Icon(icon, contentDescription = null, tint = Color.White, modifier = Modifier.size(22.dp))
        }
        Spacer(Modifier.width(Space.lg))
        Column(Modifier.weight(1f)) {
            Text(title, style = EcdType.h4, color = c.textDark)
            if (subtitle != null) {
                Text(subtitle, style = EcdType.bodySmall, color = c.textMid)
            }
        }
        if (trailing != null) {
            trailing()
        } else if (onClick != null) {
            Icon(
                Icons.AutoMirrored.Filled.KeyboardArrowRight,
                contentDescription = null,
                tint = c.textMid,
                modifier = Modifier.size(Sizes.iconDefault),
            )
        }
    }
}

/**
 * W3 completeness card: progress + ONE specific next action. Dismissible, never blocks.
 */
@Composable
fun CompletenessCard(
    percent: Int,
    nextAction: String,
    onDismiss: () -> Unit,
    onAction: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val c = Ecd.colors
    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(c.secondaryAccent2, RoundedCornerShape(Radius.lg))
            .padding(Space.lg),
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(
                "Your profile is $percent% complete",
                style = EcdType.h4,
                color = c.textDark,
                modifier = Modifier.weight(1f),
            )
            IconButton(onClick = onDismiss, modifier = Modifier.size(32.dp)) {
                Icon(Icons.Filled.Close, contentDescription = "Dismiss", tint = c.textMid, modifier = Modifier.size(18.dp))
            }
        }
        Spacer(Modifier.height(Space.sm))
        LinearProgressIndicator(
            progress = { percent / 100f },
            modifier = Modifier.fillMaxWidth().height(Sizes.progressBar),
            color = Status.successMain,
            trackColor = c.surface,
            strokeCap = StrokeCap.Round,
        )
        Spacer(Modifier.height(Space.md))
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable(onClick = onAction)
                .defaultMinSize(minHeight = Sizes.touchTarget),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(nextAction, style = EcdType.bodySmallStrong, color = c.primary, modifier = Modifier.weight(1f))
            Icon(
                Icons.AutoMirrored.Filled.KeyboardArrowRight,
                contentDescription = null,
                tint = c.primary,
                modifier = Modifier.size(Sizes.iconButton),
            )
        }
    }
}

/**
 * W4a "Needs attention" card: soft warning, inform-don't-block, max 3 rows + "See all".
 */
@Composable
fun NeedsAttentionCard(
    items: List<String>,
    onItemClick: (Int) -> Unit,
    onSeeAll: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(Status.alertBg, RoundedCornerShape(Radius.lg))
            .padding(Space.lg),
    ) {
        Text("Needs attention", style = EcdType.h4, color = Status.alertDark)
        Spacer(Modifier.height(Space.sm))
        items.take(3).forEachIndexed { index, message ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onItemClick(index) }
                    .defaultMinSize(minHeight = Sizes.touchTarget),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(message, style = EcdType.bodySmall, color = Ecd.colors.textDark, modifier = Modifier.weight(1f))
                Icon(
                    Icons.AutoMirrored.Filled.KeyboardArrowRight,
                    contentDescription = null,
                    tint = Status.alertDark,
                    modifier = Modifier.size(Sizes.iconButton),
                )
            }
        }
        if (items.size > 3) {
            LinkButton("See all", onClick = onSeeAll)
        }
    }
}

/**
 * W4a nudge slot: one at a time, dismissible, fixed slot so layout never jumps.
 */
@Composable
fun NudgeSlot(
    message: String?,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val c = Ecd.colors
    Box(modifier = modifier.fillMaxWidth().defaultMinSize(minHeight = Sizes.nudgeSlotMin)) {
        if (message != null) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Status.infoBg, RoundedCornerShape(Radius.lg))
                    .padding(Space.lg),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(message, style = EcdType.bodySmall, color = Status.infoDark, modifier = Modifier.weight(1f))
                IconButton(onClick = onDismiss, modifier = Modifier.size(32.dp)) {
                    Icon(Icons.Filled.Close, contentDescription = "Dismiss", tint = Status.infoDark, modifier = Modifier.size(18.dp))
                }
            }
        }
    }
}

/** Inline error card with retry — never a full-screen error (spec W4a states). */
@Composable
fun InlineErrorCard(
    message: String,
    onRetry: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(Status.errorBg, RoundedCornerShape(Radius.lg))
            .padding(Space.lg),
    ) {
        Text(message, style = EcdType.bodySmall, color = Status.errorDark)
        LinkButton("Try again", onClick = onRetry)
    }
}
