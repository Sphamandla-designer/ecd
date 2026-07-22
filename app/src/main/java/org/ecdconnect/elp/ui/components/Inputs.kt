package org.ecdconnect.elp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Radius
import org.ecdconnect.elp.theme.Sizes
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.theme.Status

/**
 * Text input per design-system/components.md §3:
 * resting = background fill, no border; focused = surface + 2dp secondary border;
 * error = surface + 2dp errorMain border, message in errorDark below.
 */
@Composable
fun EcdTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier,
    placeholder: String = "",
    helper: String? = null,
    error: String? = null,
    keyboardType: KeyboardType = KeyboardType.Text,
    singleLine: Boolean = true,
) {
    val c = Ecd.colors
    val interactionSource = remember { MutableInteractionSource() }
    val focused = interactionSource.collectIsFocusedAsState().value

    Column(modifier = modifier.fillMaxWidth()) {
        Text(label, style = EcdType.h4, color = c.textDark)
        Spacer(Space.xs)
        val shape = RoundedCornerShape(Radius.sm)
        val fieldModifier = Modifier
            .fillMaxWidth()
            .height(Sizes.inputHeight)
            .let {
                when {
                    error != null -> it.background(c.surface, shape).border(2.dp, Status.errorMain, shape)
                    focused -> it.background(c.surface, shape).border(2.dp, c.secondary, shape)
                    value.isNotEmpty() -> it.background(c.surface, shape).border(1.dp, c.primaryAccent2, shape)
                    else -> it.background(c.background, shape)
                }
            }
            .padding(horizontal = Space.lg)

        Box(fieldModifier, contentAlignment = Alignment.CenterStart) {
            BasicTextField(
                value = value,
                onValueChange = onValueChange,
                textStyle = EcdType.body.copy(color = if (error != null) Status.errorDark else c.textDark),
                keyboardOptions = KeyboardOptions(keyboardType = keyboardType),
                singleLine = singleLine,
                cursorBrush = SolidColor(c.textDark),
                interactionSource = interactionSource,
                modifier = Modifier.fillMaxWidth(),
            )
            if (value.isEmpty()) {
                Text(placeholder, style = EcdType.body, color = c.textLight)
            }
        }
        if (error != null) {
            Spacer(Space.xs)
            Text(error, style = EcdType.bodySmall, color = Status.errorDark)
        } else if (helper != null) {
            Spacer(Space.xs)
            Text(helper, style = EcdType.bodySmall, color = c.textMid)
        }
    }
}

/** 5-box OTP input: one hidden field, boxes drawn from its value; auto-submit upstream. */
@Composable
fun OtpInput(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    length: Int = 5,
    isError: Boolean = false,
) {
    val c = Ecd.colors
    BasicTextField(
        value = value,
        onValueChange = { new -> onValueChange(new.filter(Char::isDigit).take(length)) },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.NumberPassword),
        singleLine = true,
        cursorBrush = SolidColor(c.textDark),
        modifier = modifier,
        decorationBox = { _ ->
            Row(horizontalArrangement = Arrangement.spacedBy(Space.sm)) {
                repeat(length) { index ->
                    val char = value.getOrNull(index)?.toString() ?: ""
                    val active = index == value.length
                    val shape = RoundedCornerShape(Radius.sm)
                    Box(
                        modifier = Modifier
                            .size(width = 52.dp, height = 56.dp)
                            .let {
                                when {
                                    isError -> it.background(c.surface, shape).border(2.dp, Status.errorMain, shape)
                                    active -> it.background(c.surface, shape).border(2.dp, c.secondary, shape)
                                    char.isNotEmpty() -> it.background(c.surface, shape).border(1.dp, c.primaryAccent2, shape)
                                    else -> it.background(c.background, shape)
                                }
                            },
                        contentAlignment = Alignment.Center,
                    ) {
                        Text(
                            char,
                            style = EcdType.h1,
                            color = if (isError) Status.errorDark else c.textDark,
                            textAlign = TextAlign.Center,
                        )
                    }
                }
            }
        },
    )
}

@Composable
private fun Spacer(height: androidx.compose.ui.unit.Dp) {
    androidx.compose.foundation.layout.Spacer(Modifier.height(height))
}
