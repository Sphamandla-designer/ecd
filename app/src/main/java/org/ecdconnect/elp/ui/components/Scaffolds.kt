package org.ecdconnect.elp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CloudOff
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Radius
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.theme.Status

/**
 * Offline ticker (design system): a thin errorMain strip with the offline pill,
 * shown under the header on every screen while disconnected. Ambient, not modal.
 */
@Composable
fun OfflineTicker(visible: Boolean, modifier: Modifier = Modifier) {
    if (!visible) return
    Box(modifier = modifier.fillMaxWidth().height(24.dp), contentAlignment = Alignment.Center) {
        Box(
            Modifier
                .fillMaxWidth()
                .height(3.dp)
                .background(Status.errorMain)
        )
        Row(
            modifier = Modifier
                .background(Status.errorMain, CircleShape)
                .padding(horizontal = 6.dp, vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Icon(
                Icons.Filled.CloudOff,
                contentDescription = null,
                tint = Color.White,
                modifier = Modifier.size(14.dp),
            )
            Spacer(Modifier.width(Space.xs))
            Text("Offline", style = EcdType.caption, color = Color.White)
        }
    }
}

/** One-time offline reassurance banner (spec W4a offline state). */
@Composable
fun OfflineReassurance(modifier: Modifier = Modifier) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(Status.infoBg, RoundedCornerShape(Radius.md))
            .padding(Space.lg),
    ) {
        Text(
            "You're offline. Keep working — everything saves and syncs later.",
            style = EcdType.bodySmall,
            color = Status.infoDark,
        )
    }
}

/** Skeleton list row for the dashboard loading state. */
@Composable
fun SkeletonRow(modifier: Modifier = Modifier) {
    val c = Ecd.colors
    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(c.surface, RoundedCornerShape(Radius.md))
            .padding(Space.lg),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(Modifier.size(48.dp).background(c.background, CircleShape))
        Spacer(Modifier.width(Space.lg))
        Column {
            Box(Modifier.width(160.dp).height(14.dp).background(c.background, RoundedCornerShape(7.dp)))
            Spacer(Modifier.height(Space.sm))
            Box(Modifier.width(100.dp).height(10.dp).background(c.background, RoundedCornerShape(5.dp)))
        }
    }
}

/** Tenant brand mark placeholder: initial in a primary circle + wordmark. */
@Composable
fun BrandMark(appLabel: String, large: Boolean, onDark: Boolean = false, modifier: Modifier = Modifier) {
    val c = Ecd.colors
    Row(modifier = modifier, verticalAlignment = Alignment.CenterVertically) {
        Box(
            modifier = Modifier
                .size(if (large) 56.dp else 32.dp)
                .background(if (onDark) c.onPrimary else c.primary, CircleShape),
            contentAlignment = Alignment.Center,
        ) {
            Text(
                appLabel.take(1),
                style = if (large) EcdType.h1 else EcdType.h4,
                color = if (onDark) c.primary else c.onPrimary,
            )
        }
        Spacer(Modifier.width(Space.sm))
        Text(
            appLabel,
            style = if (large) EcdType.h1 else EcdType.h3,
            color = if (onDark) c.onPrimary else c.textDark,
        )
    }
}
