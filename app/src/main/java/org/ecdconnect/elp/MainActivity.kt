package org.ecdconnect.elp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import org.ecdconnect.elp.navigation.AppNavHost
import org.ecdconnect.elp.theme.EcdTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val container = (application as ElpApplication).container
        setContent {
            EcdTheme(tenantColors = container.tenantColors) {
                AppNavHost(container = container)
            }
        }
    }
}
