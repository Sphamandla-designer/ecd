package org.ecdconnect.elp.ui.placeholder

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import org.ecdconnect.elp.theme.Ecd
import org.ecdconnect.elp.theme.EcdType
import org.ecdconnect.elp.theme.Space

/**
 * Coming-in-next-tranche surfaces (W5 classes, W12 income). Warm and directive,
 * not blank — the tab exists so navigation doesn't reshuffle later.
 */
@Composable
fun ComingSoonScreen(title: String, body: String, modifier: Modifier = Modifier) {
    val c = Ecd.colors
    Column(
        modifier = modifier
            .fillMaxSize()
            .background(c.background)
            .padding(Space.xxl),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        Text(title, style = EcdType.h1, color = c.textDark, textAlign = TextAlign.Center)
        Spacer(Modifier.height(Space.sm))
        Text(body, style = EcdType.bodyLarge, color = c.textMid, textAlign = TextAlign.Center)
    }
}
