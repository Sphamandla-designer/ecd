plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
}

android {
    namespace = "org.ecdconnect.elp"
    compileSdk = 35

    defaultConfig {
        applicationId = "org.ecdconnect.elp"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
    }

    // White-label: one product, many tenants. Each flavor ships a tenant id whose
    // theme JSON (assets/themes/<tenant>.json) is the in-binary fallback; the live
    // theme comes from TENANT.theme_tokens at login and is cached offline.
    flavorDimensions += "tenant"
    productFlavors {
        create("ecdConnect") {
            dimension = "tenant"
            buildConfigField("String", "TENANT_ID", "\"ecd-connect\"")
            buildConfigField("String", "APP_LABEL", "\"ECD Connect\"")
            manifestPlaceholders["appLabel"] = "ECD Connect"
        }
        create("smartstart") {
            dimension = "tenant"
            applicationIdSuffix = ".smartstart"
            buildConfigField("String", "TENANT_ID", "\"smartstart\"")
            buildConfigField("String", "APP_LABEL", "\"SmartStart\"")
            manifestPlaceholders["appLabel"] = "SmartStart"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons)
    implementation(libs.androidx.compose.ui.text.google.fonts)
    implementation(libs.androidx.navigation.compose)
    implementation(libs.androidx.datastore.preferences)
    implementation(libs.kotlinx.serialization.json)
    implementation(libs.kotlinx.coroutines.android)
    debugImplementation(libs.androidx.compose.ui.tooling)
}
