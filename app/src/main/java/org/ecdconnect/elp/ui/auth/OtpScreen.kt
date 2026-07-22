package org.ecdconnect.elp.ui.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.ui.components.LinkButton
import org.ecdconnect.elp.ui.components.OtpInput
import org.ecdconnect.elp.ui.components.PrimaryButton

/** W2b — enter the 5-digit code. Auto-submits on the last digit; never locks out. */
@Composable
fun OtpScreen(
    viewModel: AuthViewModel,
    onSignedIn: () -> Unit,
    onChangeNumber: () -> Unit,
) {
    val c = Ecd.colors
    val state by viewModel.state.collectAsState()

    LaunchedEffect(state.signedIn) {
        if (state.signedIn) onSignedIn()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(c.surface)
            .padding(Space.lg),
    ) {
        Spacer(Modifier.height(Space.xxl))
        Text("Enter the code", style = EcdType.h1, color = c.textDark)
        Spacer(Modifier.height(Space.sm))
        Text(
            "We sent a 5-digit code to ${formatSaPhone(state.phone)}.",
            style = EcdType.bodyLarge,
            color = c.textMid,
        )
        Spacer(Modifier.height(Space.xl))

        OtpInput(
            value = state.code,
            onValueChange = viewModel::onCodeChanged,
            isError = state.codeError != null,
        )

        if (state.codeError != null) {
            Spacer(Modifier.height(Space.sm))
            Text(state.codeError!!, style = EcdType.bodySmall, color = org.ecdconnect.elp.theme.Status.errorDark)
        }

        Spacer(Modifier.height(Space.xl))
        PrimaryButton(
            text = "Sign in",
            onClick = viewModel::verify,
            enabled = state.code.length == 5,
            loading = state.verifying,
        )
        Spacer(Modifier.height(Space.sm))
        Row {
            if (state.resendSeconds > 0) {
                val secs = state.resendSeconds
                LinkButton("Resend in 0:%02d".format(secs), onClick = {})
            } else {
                LinkButton("Resend code", onClick = viewModel::resend)
            }
            Spacer(Modifier.width(Space.lg))
            LinkButton("Change number", onClick = {
                viewModel.changeNumber()
                onChangeNumber()
            })
        }
    }
}
