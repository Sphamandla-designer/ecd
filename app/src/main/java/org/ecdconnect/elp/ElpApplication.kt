package org.ecdconnect.elp

import android.app.Application
import org.ecdconnect.elp.data.AppContainer

class ElpApplication : Application() {

    lateinit var container: AppContainer
        private set

    override fun onCreate() {
        super.onCreate()
        container = AppContainer(this)
        // Sync runs for the app's whole life: local writes drain whenever we're online.
        container.syncEngine.start()
    }
}
