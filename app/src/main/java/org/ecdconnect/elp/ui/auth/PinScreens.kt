package org.ecdconnect.elp.ui.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import kotlinx.coroutines.launch
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.theme.Status
import org.ecdconnect.elp.ui.components.LinkButton
import org.ecdconnect.elp.ui.components.OtpInput
import org.ecdconnect.elp.ui.components.PrimaryButton
import org.ecdconnect.elp.ui.components.SecondaryButton

/**
 * W2c (proposal, assumption A2): after first OTP sign-in, offer a local 4-digit
 * PIN for fast, offline re-entry. Skippable — never a gate.
 */
@Composable
fun CreatePinScreen(
    viewModel: AuthViewModel,
    onDone: () -> Unit,
) {
    val c = Ecd.colors
    var pin by remember { mutableStateOf("") }
    var confirm by remember { mutableStateOf("") }
    var stage by remember { mutableStateOf(0) } // 0 = enter, 1 = confirm
    var error by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(c.surface)
            .padding(Space.lg),
    ) {
        Spacer(Modifier.height(Space.xxl))
        Text(
            if (stage == 0) "Create a 4-digit PIN to get back in quickly" else "Enter your PIN again",
            style = EcdType.h1,
            color = c.textDark,
        )
        Spacer(Modifier.height(Space.sm))
        Text(
            "Your PIN unlocks the app even when you're offline. No codes, no waiting.",
            style = EcdType.bodyLarge,
            color = c.textMid,
        )
        Spacer(Modifier.height(Space.xl))

        OtpInput(
            value = if (stage == 0) pin else confirm,
            onValueChange = { value ->
                error = null
                if (stage == 0) {
                    pin = value
                    if (value.length == 4) stage = 1
                } else {
                    confirm = value
                }
            },
            length = 4,
            isError = error != null,
        )
        if (error != null) {
            Spacer(Modifier.height(Space.sm))
            Text(error!!, style = EcdType.bodySmall, color = Status.errorDark)
        }

        Spacer(Modifier.height(Space.xl))
        if (stage == 1) {
            PrimaryButton(
                text = "Save PIN",
                onClick = {
                    if (confirm == pin) {
                        viewModel.savePin(pin) { onDone() }
                    } else {
                        error = "Those PINs don't match. Try again."
                        confirm = ""
                    }
                },
                enabled = confirm.length == 4,
            )
            Spacer(Modifier.height(Space.sm))
        }
        SecondaryButton(text = "Skip for now", onClick = { viewModel.skipPin { onDone() } })
    }
}

/** PIN unlock for returning users — works fully offline. Forgot PIN -> OTP re-verify. */
@Composable
fun PinUnlockScreen(
    viewModel: AuthViewModel,
    appLabel: String,
    onUnlocked: () -> Unit,
    onForgotPin: () -> Unit,
) {
    val c = Ecd.colors
    val scope = rememberCoroutineScope()
    var pin by remember { mutableStateOf("") }
    var error by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(c.surface)
            .padding(Space.lg),
    ) {
        Spacer(Modifier.height(Space.xxl))
        org.ecdconnect.elp.ui.components.BrandMark(appLabel = appLabel, large = false)
        Spacer(Modifier.height(Space.xl))
        Text("Enter your PIN", style = EcdType.h1, color = c.textDark)
        Spacer(Modifier.height(Space.xl))

        OtpInput(
            value = pin,
            onValueChange = { value ->
                error = null
                pin = value
                if (value.length == 4) {
                    scope.launch {
                        if (viewModel.checkPin(value)) {
                            onUnlocked()
                        } else {
                            error = "That PIN isn't right. Try again."
                            pin = ""
                        }
                    }
                }
            },
            length = 4,
            isError = error != null,
        )
        if (error != null) {
            Spacer(Modifier.height(Space.sm))
            Text(error!!, style = EcdType.bodySmall, color = Status.errorDark)
        }

        Spacer(Modifier.height(Space.xl))
        LinkButton("Forgot your PIN?", onClick = onForgotPin)
    }
}
