package org.ecdconnect.elp.ui.dashboard

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Groups
import androidx.compose.material.icons.filled.Payments
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import org.ecdconnect.elp.model.SyncState
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Space
import org.ecdconnect.elp.theme.Status
import org.ecdconnect.elp.ui.components.LinkButton
import org.ecdconnect.elp.ui.components.ListRow
import org.ecdconnect.elp.ui.components.NeedsAttentionCard
import org.ecdconnect.elp.ui.components.NudgeSlot
import org.ecdconnect.elp.ui.components.OfflineReassurance
import org.ecdconnect.elp.ui.components.OfflineTicker
import org.ecdconnect.elp.ui.components.Pill
import org.ecdconnect.elp.ui.components.PrimaryButton
import org.ecdconnect.elp.ui.components.SectionCard
import org.ecdconnect.elp.ui.components.SkeletonRow
import org.ecdconnect.elp.ui.components.SyncChip
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

/** W4a — the app's home. Header renders immediately; content streams in below. */
@Composable
fun DashboardScreen(
    viewModel: DashboardViewModel,
    onOpenClass: (String) -> Unit,
    onOpenProfile: () -> Unit,
    onAddClass: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val c = Ecd.colors
    val ui by viewModel.ui.collectAsState()

    LaunchedEffect(ui.showOfflineReassurance) {
        if (ui.showOfflineReassurance) viewModel.markOfflineReassuranceSeen()
    }

    Column(modifier = modifier.fillMaxSize().background(c.background)) {
        // 1 · Header — action background, on-action text, sync chip top-right.
        Column(Modifier.fillMaxWidth().background(c.primary).padding(Space.lg)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text(
                        "${greeting()}, ${ui.profile.fullName.substringBefore(' ').ifBlank { "there" }}",
                        style = EcdType.display,
                        color = c.onPrimary,
                    )
                    Spacer(Modifier.height(Space.xs))
                    Text(todayLabel(), style = EcdType.bodySmall, color = c.onPrimary.copy(alpha = 0.85f))
                }
                SyncChip(state = ui.syncState)
            }
            Spacer(Modifier.height(Space.lg))
        }

        OfflineTicker(visible = ui.syncState == SyncState.OFFLINE)

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(Space.lg),
            verticalArrangement = Arrangement.spacedBy(Space.lg),
        ) {
            // First-offline reassurance, shown once ever.
            if (ui.showOfflineReassurance) {
                item { OfflineReassurance() }
            }

            // 2 · Primary action — the single most frequent daily task.
            item {
                if (ui.loading) {
                    SkeletonRow()
                } else if (ui.classes.isEmpty()) {
                    // Empty state: an invitation to act, not a statement of absence.
                    SectionCard {
                        Text("Welcome!", style = EcdType.h2, color = c.textDark)
                        Spacer(Modifier.height(Space.sm))
                        Text(
                            "Add your first class to start taking attendance.",
                            style = EcdType.bodyLarge,
                            color = c.textMid,
                        )
                        Spacer(Modifier.height(Space.lg))
                        PrimaryButton("Add a class", onClick = onAddClass)
                    }
                } else if (ui.attendanceAllDone) {
                    SectionCard {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            androidx.compose.material3.Icon(
                                Icons.Filled.CheckCircle,
                                contentDescription = null,
                                tint = Status.successMain,
                            )
                            Spacer(Modifier.width(Space.sm))
                            Text(
                                if (ui.classes.size == 1) "Attendance done for your class"
                                else "Attendance done for all ${ui.classes.size} classes",
                                style = EcdType.h4,
                                color = c.textDark,
                            )
                        }
                        LinkButton("View or change", onClick = { /* W6 next tranche */ })
                    }
                } else {
                    PrimaryButton("Take attendance", onClick = viewModel::takeAttendance)
                }
            }

            // 3 · Needs attention — only when non-empty; max 3 + See all.
            if (ui.needsAttention.isNotEmpty()) {
                item {
                    NeedsAttentionCard(
                        items = ui.needsAttention.map { it.message },
                        onItemClick = { index ->
                            val id = ui.needsAttention.getOrNull(index)?.id ?: return@NeedsAttentionCard
                            if (id.startsWith("profile")) onOpenProfile() else onOpenClass(id.removePrefix("class."))
                        },
                        onSeeAll = { /* full list lands with W5 */ },
                    )
                }
            }

            // 4 · Nudge slot — reserved height so the layout never jumps.
            item {
                NudgeSlot(message = ui.nudge, onDismiss = viewModel::dismissNudge)
            }

            // 5 · My classes
            if (ui.classes.isNotEmpty()) {
                item { Text("My classes", style = EcdType.h2, color = c.textDark) }
                items(ui.classes.size) { index ->
                    val cls = ui.classes[index]
                    ListRow(
                        title = cls.name,
                        subtitle = "${cls.childCount} ${if (cls.childCount == 1) "child" else "children"}",
                        icon = Icons.Filled.School,
                        iconTint = c.tertiary,
                        onClick = { onOpenClass(cls.id) },
                        trailing = {
                            if (cls.attendanceDoneToday) {
                                Pill("Done", background = Status.successBg, contentColor = Status.successDark)
                            } else {
                                Pill("Due today", background = Status.alertBg, contentColor = Status.alertDark)
                            }
                        },
                    )
                }
            }

            // 6 · Principal-only blocks
            if (ui.isPrincipal) {
                item { Text("My site", style = EcdType.h2, color = c.textDark) }
                item {
                    ListRow(
                        title = "Staff",
                        subtitle = "Invite and manage practitioners",
                        icon = Icons.Filled.Groups,
                        iconTint = c.quaternaryOrSecondary(),
                        onClick = { /* staff dashboard lands with W4a-staff */ },
                    )
                }
                item {
                    ListRow(
                        title = "This month's income",
                        subtitle = "Track who has paid",
                        icon = Icons.Filled.Payments,
                        iconTint = c.quinaryOrTertiary(),
                        onClick = { /* W12 next tranche */ },
                    )
                }
            }

            item { Spacer(Modifier.height(Space.xxl)) }
        }
    }
}

private fun greeting(): String {
    val hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
    return when {
        hour < 12 -> "Good morning"
        hour < 17 -> "Good afternoon"
        else -> "Good evening"
    }
}

private fun todayLabel(): String =
    SimpleDateFormat("EEEE, d MMMM", Locale.getDefault()).format(Date())

// Category colours: fall back gracefully for tenants without 5 hues.
private fun org.ecdconnect.elp.theme.TenantColors.quaternaryOrSecondary() = quaternary
private fun org.ecdconnect.elp.theme.TenantColors.quinaryOrTertiary() = quinary
