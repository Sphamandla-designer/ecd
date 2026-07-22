package org.ecdconnect.elp.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Radius
import org.ecdconnect.elp.theme.Sizes
import org.ecdconnect.elp.theme.Space
import androidx.compose.ui.unit.dp

/**
 * btn-primary: full-width action button.
 * primary fill, onPrimary Quicksand SemiBold label, radius-lg, 48dp touch height;
 * disabled = primaryAccent2 fill (design-system/components.md §1).
 */
@Composable
fun PrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    loading: Boolean = false,
    icon: ImageVector? = null,
) {
    val c = Ecd.colors
    Button(
        onClick = onClick,
        enabled = enabled && !loading,
        modifier = modifier.fillMaxWidth().height(Sizes.buttonHeight),
        shape = RoundedCornerShape(Radius.lg),
        colors = ButtonDefaults.buttonColors(
            containerColor = if (loading) c.primaryAccent1 else c.primary,
            contentColor = c.onPrimary,
            disabledContainerColor = c.primaryAccent2,
            disabledContentColor = c.onPrimary,
        ),
    ) {
        if (loading) {
            CircularProgressIndicator(
                modifier = Modifier.size(Sizes.iconSmall),
                color = c.onPrimary,
                strokeWidth = 2.dp,
            )
            Spacer(Modifier.width(Space.sm))
        } else if (icon != null) {
            Icon(icon, contentDescription = null, modifier = Modifier.size(Sizes.iconButton))
            Spacer(Modifier.width(Space.sm))
        }
        Text(text, style = EcdType.button)
    }
}

@Composable
fun SecondaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    icon: ImageVector? = null,
) {
    val c = Ecd.colors
    OutlinedButton(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier.fillMaxWidth().height(Sizes.buttonHeight),
        shape = RoundedCornerShape(Radius.lg),
        border = BorderStroke(2.dp, if (enabled) c.primary else c.primaryAccent2),
        colors = ButtonDefaults.outlinedButtonColors(
            contentColor = c.primary,
            disabledContentColor = c.primaryAccent2,
        ),
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            if (icon != null) {
                Icon(icon, contentDescription = null, modifier = Modifier.size(Sizes.iconButton))
                Spacer(Modifier.width(Space.sm))
            }
            Text(text, style = EcdType.button)
        }
    }
}

/** Tertiary link — plain text action ("Need help signing in?", "View or change"). */
@Composable
fun LinkButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    TextButton(onClick = onClick, modifier = modifier.height(Sizes.touchTarget)) {
        Text(text, style = EcdType.button, color = Ecd.colors.primary)
    }
}
