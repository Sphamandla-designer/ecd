package org.ecdconnect.elp.ui.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.ecdconnect.elp.model.Role
import org.ecdconnect.elp.model.SyncState
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Sizes
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.ui.components.CompletenessCard
import org.ecdconnect.elp.ui.components.EcdTextField
import org.ecdconnect.elp.ui.components.LinkButton
import org.ecdconnect.elp.ui.components.OfflineTicker
import org.ecdconnect.elp.ui.components.PendingChip
import org.ecdconnect.elp.ui.components.PrimaryButton
import org.ecdconnect.elp.ui.components.RoleChip
import org.ecdconnect.elp.ui.components.SectionCard

/**
 * W3 — profile screen. Identity and role built up over time; missing fields get a
 * quiet "Add" affordance, never an empty error state.
 */
@Composable
fun ProfileScreen(
    viewModel: ProfileViewModel,
    modifier: Modifier = Modifier,
) {
    val c = Ecd.colors
    val ui by viewModel.ui.collectAsState()
    var editingId by remember { mutableStateOf(false) }
    var editingEmail by remember { mutableStateOf(false) }
    var idValue by remember { mutableStateOf("") }
    var emailValue by remember { mutableStateOf("") }

    Column(modifier = modifier.fillMaxSize().background(c.background)) {
        // Header: avatar (initials on action-soft), name, role chip, site.
        Column(Modifier.fillMaxWidth().background(c.surface).padding(Space.lg)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier.size(Sizes.avatarSm).background(c.primaryAccent2, CircleShape),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(initials(ui.profile.fullName), style = EcdType.h4, color = c.primary)
                }
                Spacer(Modifier.width(Space.lg))
                Column {
                    Text(ui.profile.fullName.ifBlank { "Your name" }, style = EcdType.h2, color = c.textDark)
                    Spacer(Modifier.height(Space.xs))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        RoleChip(if (ui.profile.role == Role.PRINCIPAL) "Principal" else "Practitioner")
                        Spacer(Modifier.width(Space.sm))
                        Text(ui.profile.siteName, style = EcdType.bodySmall, color = c.textMid)
                    }
                }
            }
        }

        OfflineTicker(visible = ui.syncState == SyncState.OFFLINE)

        Column(
            Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(Space.lg),
        ) {
            // Completeness card: one specific next action, dismissible, never blocks.
            if (ui.completeness < 100 && !ui.cardDismissed && ui.nextAction != null) {
                CompletenessCard(
                    percent = ui.completeness,
                    nextAction = ui.nextAction!!,
                    onDismiss = viewModel::dismissCompletenessCard,
                    onAction = {
                        when {
                            ui.profile.idNumber == null -> editingId = true
                            ui.profile.email == null -> editingEmail = true
                        }
                    },
                )
                Spacer(Modifier.height(Space.lg))
            }

            // Personal details
            SectionCard {
                SectionTitle("Personal details", pending = ui.pendingSections && ui.syncState != SyncState.SYNCED)
                FieldLine(label = "Full name", value = ui.profile.fullName)
                FieldLine(label = "Phone", value = ui.profile.phone.ifBlank { null })
                if (editingId) {
                    Spacer(Modifier.height(Space.sm))
                    EcdTextField(
                        value = idValue,
                        onValueChange = { idValue = it },
                        label = "ID number",
                        helper = "So you can be approved",
                    )
                    Spacer(Modifier.height(Space.sm))
                    PrimaryButton("Save", onClick = {
                        viewModel.updateField({ it.copy(idNumber = idValue.trim()) }, "profile.idNumber")
                        editingId = false
                    }, enabled = idValue.isNotBlank())
                } else {
                    AddOrValue(label = "ID number", value = ui.profile.idNumber, onAdd = { editingId = true })
                }
            }
            Spacer(Modifier.height(Space.lg))

            // Site details — derived counts, never asked (spec: derive rather than ask).
            SectionCard {
                SectionTitle("Site details", pending = false)
                FieldLine(label = "Site", value = ui.profile.siteName)
                FieldLine(
                    label = "Classes",
                    value = if (ui.classes.isEmpty()) null
                    else "${ui.classes.size} ${if (ui.classes.size == 1) "class" else "classes"}",
                )
            }
            Spacer(Modifier.height(Space.lg))

            // Contact
            SectionCard {
                SectionTitle("Contact", pending = false)
                if (editingEmail) {
                    Spacer(Modifier.height(Space.sm))
                    EcdTextField(
                        value = emailValue,
                        onValueChange = { emailValue = it },
                        label = "Email",
                        helper = "So you can get your reports",
                    )
                    Spacer(Modifier.height(Space.sm))
                    PrimaryButton("Save", onClick = {
                        viewModel.updateField({ it.copy(email = emailValue.trim()) }, "profile.email")
                        editingEmail = false
                    }, enabled = emailValue.contains("@"))
                } else {
                    AddOrValue(label = "Email", value = ui.profile.email, onAdd = { editingEmail = true })
                }
            }
            Spacer(Modifier.height(Space.xxl))
        }
    }
}

@Composable
private fun SectionTitle(title: String, pending: Boolean) {
    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
        Text(title, style = EcdType.h4, color = Ecd.colors.textDark, modifier = Modifier.weight(1f))
        if (pending) PendingChip()
    }
    Spacer(Modifier.height(Space.sm))
}

@Composable
private fun FieldLine(label: String, value: String?) {
    val c = Ecd.colors
    Row(modifier = Modifier.fillMaxWidth().padding(vertical = Space.xs)) {
        Text(label, style = EcdType.bodySmall, color = c.textMid, modifier = Modifier.width(110.dp))
        Text(value ?: "—", style = EcdType.body, color = c.textDark)
    }
}

/** Missing fields get a quiet "Add" affordance, not an error state. */
@Composable
private fun AddOrValue(label: String, value: String?, onAdd: () -> Unit) {
    val c = Ecd.colors
    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
        Text(label, style = EcdType.bodySmall, color = c.textMid, modifier = Modifier.width(110.dp))
        if (value != null) {
            Text(value, style = EcdType.body, color = c.textDark)
        } else {
            LinkButton("Add", onClick = onAdd)
        }
    }
}

private fun initials(name: String): String =
    name.split(" ").filter { it.isNotBlank() }.take(2).joinToString("") { it.first().uppercase() }
        .ifBlank { "?" }
