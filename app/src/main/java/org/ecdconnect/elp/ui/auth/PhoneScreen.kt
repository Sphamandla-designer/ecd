package org.ecdconnect.elp.ui.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Radius
import org.ecdconnect.elp.theme.Sizes
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.theme.Status
import org.ecdconnect.elp.ui.components.BrandMark
import org.ecdconnect.elp.ui.components.EcdTextField
import org.ecdconnect.elp.ui.components.LinkButton
import org.ecdconnect.elp.ui.components.PrimaryButton

/** Formats a local SA number as the user types: 082 123 4567. */
fun formatSaPhone(digits: String): String = buildString {
    digits.forEachIndexed { i, ch ->
        if (i == 3 || i == 6) append(' ')
        append(ch)
    }
}

/** W2a — enter phone number. */
@Composable
fun PhoneScreen(
    viewModel: AuthViewModel,
    appLabel: String,
    onCodeSent: () -> Unit,
    onHelp: () -> Unit,
) {
    val c = Ecd.colors
    val state by viewModel.state.collectAsState()

    androidx.compose.runtime.LaunchedEffect(state.codeSent) {
        if (state.codeSent) onCodeSent()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(c.surface)
            .padding(Space.lg),
    ) {
        Spacer(Modifier.height(Space.xl))
        BrandMark(appLabel = appLabel, large = false)
        Spacer(Modifier.height(Space.xxl))
        Text("Enter your phone number", style = EcdType.h1, color = c.textDark)
        Spacer(Modifier.height(Space.sm))
        Text("We'll send you a code to sign in.", style = EcdType.bodyLarge, color = c.textMid)
        Spacer(Modifier.height(Space.xl))

        Row(verticalAlignment = Alignment.Bottom) {
            // Country prefix, fixed +27 for now.
            Box(
                modifier = Modifier
                    .height(Sizes.inputHeight)
                    .background(c.background, RoundedCornerShape(Radius.sm))
                    .padding(horizontal = Space.lg),
                contentAlignment = Alignment.Center,
            ) {
                Text("+27", style = EcdType.body, color = c.textDark)
            }
            Spacer(Modifier.width(Space.sm))
            Box(Modifier.weight(1f)) {
                EcdTextField(
                    value = formatSaPhone(state.phone),
                    onValueChange = viewModel::onPhoneChanged,
                    label = "",
                    placeholder = "082 123 4567",
                    keyboardType = KeyboardType.Phone,
                    error = state.phoneError,
                )
            }
        }

        if (state.offlineMessage != null) {
            Spacer(Modifier.height(Space.lg))
            Box(
                Modifier
                    .fillMaxWidth()
                    .background(Status.infoBg, RoundedCornerShape(Radius.md))
                    .padding(Space.lg),
            ) {
                Text(state.offlineMessage!!, style = EcdType.bodySmall, color = Status.infoDark)
            }
        }

        Spacer(Modifier.height(Space.xl))
        PrimaryButton(
            text = "Send code",
            onClick = viewModel::sendCode,
            enabled = viewModel.phonePlausible(state.phone),
            loading = state.sendingCode,
        )
        Spacer(Modifier.height(Space.sm))
        Column(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.Center) {
            LinkButton("Need help signing in?", onClick = onHelp)
        }
    }
}
