package org.ecdconnect.elp.data

import kotlinx.coroutines.delay

/**
 * Phone + OTP auth against the platform. Stubbed for tranche 1:
 *  - any plausibly complete number is accepted (server decides in production)
 *  - the OTP "00000" simulates a wrong code so the error state is demonstrable
 *  - requesting a code needs a connection; W2b's offline copy handles the rest
 *
 * Assumption A1 (one number = one account) is embedded here on purpose: when the
 * account-picker business rule lands, [verifyCode] grows a multi-account result.
 */
class AuthRepository(private val connectivity: ConnectivityObserver) {

    sealed interface RequestCodeResult {
        data object Sent : RequestCodeResult
        data object Offline : RequestCodeResult
        data class Failed(val reason: String) : RequestCodeResult
    }

    sealed interface VerifyResult {
        data object Success : VerifyResult
        data object WrongCode : VerifyResult
        data object Expired : VerifyResult
        data object Offline : VerifyResult
    }

    suspend fun requestCode(phone: String): RequestCodeResult {
        if (!connectivity.currentlyOnline()) return RequestCodeResult.Offline
        delay(600) // simulated SMS gateway call
        return RequestCodeResult.Sent
    }

    suspend fun verifyCode(phone: String, code: String): VerifyResult {
        if (!connectivity.currentlyOnline()) return VerifyResult.Offline
        delay(600)
        return when (code) {
            "00000" -> VerifyResult.WrongCode
            else -> VerifyResult.Success
        }
    }
}
