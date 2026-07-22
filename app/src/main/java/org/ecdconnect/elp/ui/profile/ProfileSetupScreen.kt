package org.ecdconnect.elp.ui.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.ecdconnect.elp.model.Role
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.ui.components.EcdTextField
import org.ecdconnect.elp.ui.components.PrimaryButton
import org.ecdconnect.elp.ui.components.SecondaryButton

/**
 * W3 first-run capture — the screen that replaces the old long registration.
 * One question per step, four steps, nothing else. Everything later is
 * prompted contextually by the completeness card.
 */
@Composable
fun ProfileSetupScreen(
    viewModel: ProfileViewModel,
    phone: String,
    onDone: () -> Unit,
) {
    val c = Ecd.colors
    var step by remember { mutableStateOf(0) }
    var name by remember { mutableStateOf("") }
    var role by remember { mutableStateOf<Role?>(null) }
    var site by remember { mutableStateOf("") }
    var className by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(c.surface)
            .padding(Space.lg),
    ) {
        Spacer(Modifier.height(Space.xl))

        // Step dots — scaffolded, visible progress, no percentage theatre.
        Row {
            repeat(4) { i ->
                androidx.compose.foundation.layout.Box(
                    modifier = Modifier
                        .padding(end = Space.sm)
                        .height(8.dp)
                        .width(if (i == step) 24.dp else 8.dp)
                        .background(if (i <= step) c.primary else c.primaryAccent2, CircleShape)
                )
            }
        }
        Spacer(Modifier.height(Space.xl))

        when (step) {
            0 -> {
                Text("What's your name?", style = EcdType.h1, color = c.textDark)
                Spacer(Modifier.height(Space.sm))
                Text("So your coach and colleagues know who you are.", style = EcdType.bodyLarge, color = c.textMid)
                Spacer(Modifier.height(Space.xl))
                EcdTextField(value = name, onValueChange = { name = it }, label = "Full name", placeholder = "e.g. Bulelwa Dlamini")
                Spacer(Modifier.height(Space.xl))
                PrimaryButton("Next", onClick = { step = 1 }, enabled = name.isNotBlank())
            }
            1 -> {
                Text("What do you do?", style = EcdType.h1, color = c.textDark)
                Spacer(Modifier.height(Space.sm))
                Text("Principals also manage the site and staff.", style = EcdType.bodyLarge, color = c.textMid)
                Spacer(Modifier.height(Space.xl))
                PrimaryButton(
                    "I'm a practitioner",
                    onClick = { role = Role.PRACTITIONER; step = 2 },
                )
                Spacer(Modifier.height(Space.md))
                SecondaryButton(
                    "I'm a principal",
                    onClick = { role = Role.PRINCIPAL; step = 2 },
                )
            }
            2 -> {
                Text("Where do you work?", style = EcdType.h1, color = c.textDark)
                Spacer(Modifier.height(Space.sm))
                Text("The name of your site or preschool.", style = EcdType.bodyLarge, color = c.textMid)
                Spacer(Modifier.height(Space.xl))
                EcdTextField(value = site, onValueChange = { site = it }, label = "Site or preschool name", placeholder = "e.g. Little Stars")
                Spacer(Modifier.height(Space.xl))
                PrimaryButton("Next", onClick = { step = 3 }, enabled = site.isNotBlank())
            }
            else -> {
                Text("Name one class to start with", style = EcdType.h1, color = c.textDark)
                Spacer(Modifier.height(Space.sm))
                Text(
                    "You can add more classes and children later.",
                    style = EcdType.bodyLarge,
                    color = c.textMid,
                )
                Spacer(Modifier.height(Space.xl))
                EcdTextField(value = className, onValueChange = { className = it }, label = "Class name", placeholder = "e.g. Butterflies")
                Spacer(Modifier.height(Space.xl))
                PrimaryButton(
                    "Finish",
                    onClick = {
                        viewModel.completeSetup(
                            fullName = name,
                            role = role ?: Role.PRACTITIONER,
                            siteName = site,
                            className = className,
                            phone = phone,
                            onDone = onDone,
                        )
                    },
                    enabled = className.isNotBlank(),
                )
            }
        }
    }
}
