package org.ecdconnect.elp.ui.loading

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.withTimeoutOrNull
import org.ecdconnect.elp.data.AppContainer
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.ui.components.BrandMark
import org.ecdconnect.elp.ui.components.PrimaryButton

/**
 * W1 — functional gate, not a decorative splash.
 * Valid session -> dashboard (even offline — the single most important behaviour);
 * no session -> auth. ~2s budget: on overrun we proceed optimistically.
 */
@Composable
fun LoadingScreen(
    container: AppContainer,
    onSession: (hasPin: Boolean, setupComplete: Boolean) -> Unit,
    onNoSession: () -> Unit,
) {
    val c = Ecd.colors
    var failed by remember { mutableStateOf(false) }
    var attempt by remember { mutableStateOf(0) }

    LaunchedEffect(attempt) {
        failed = false
        val result = withTimeoutOrNull(2000) {
            runCatching {
                val phone = container.store.sessionPhone.first()
                if (phone != null) {
                    val pin = container.store.pin.first()
                    val setup = container.store.setupComplete.first()
                    Triple(true, pin != null, setup)
                } else {
                    Triple(false, false, false)
                }
            }.getOrNull()
        }
        when {
            result == null ->
                // Session resolution overran ~2s: proceed optimistically to the
                // dashboard and reconcile in the background (spec W1).
                onSession(false, true)
            result.first -> onSession(result.second, result.third)
            else -> onNoSession()
        }
    }

    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(Space.xxl),
        ) {
            BrandMark(appLabel = container.appLabel, large = true)
            Spacer(Modifier.height(Space.xl))
            if (failed) {
                Text("Couldn't start. Tap to try again.", style = EcdType.bodySmall, color = c.textMid)
                Spacer(Modifier.height(Space.lg))
                PrimaryButton(text = "Try again", onClick = { attempt++ })
            } else {
                LinearProgressIndicator(
                    modifier = Modifier.width(120.dp).height(3.dp),
                    color = c.primaryAccent1,
                    trackColor = c.background,
                )
            }
        }
    }
}
