package org.ecdconnect.elp.ui.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import org.ecdconnect.elp.data.AuthRepository
import org.ecdconnect.elp.data.LocalStore

/**
 * W2 auth flow state. Inform, don't block: loose client validation, the server
 * decides; wrong code never locks out; offline gets honest copy, not a dead end.
 */
class AuthViewModel(
    private val auth: AuthRepository,
    private val store: LocalStore,
) : ViewModel() {

    data class UiState(
        val phone: String = "",
        val sendingCode: Boolean = false,
        val phoneError: String? = null,
        val offlineMessage: String? = null,
        val codeSent: Boolean = false,
        val code: String = "",
        val verifying: Boolean = false,
        val codeError: String? = null,
        val resendSeconds: Int = 0,
        val signedIn: Boolean = false,
    )

    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state.asStateFlow()

    private var countdownJob: Job? = null

    /** Plausibly complete = 9+ digits after the prefix. Loose on purpose. */
    fun phonePlausible(digits: String): Boolean = digits.length >= 9

    fun onPhoneChanged(raw: String) {
        val digits = raw.filter(Char::isDigit).take(10)
        _state.value = _state.value.copy(phone = digits, phoneError = null, offlineMessage = null)
    }

    fun sendCode() {
        val s = _state.value
        if (!phonePlausible(s.phone)) {
            _state.value = s.copy(phoneError = "That number doesn't look complete.")
            return
        }
        _state.value = s.copy(sendingCode = true, phoneError = null, offlineMessage = null)
        viewModelScope.launch {
            when (auth.requestCode(s.phone)) {
                is AuthRepository.RequestCodeResult.Sent -> {
                    _state.value = _state.value.copy(sendingCode = false, codeSent = true)
                    startResendCountdown()
                }
                is AuthRepository.RequestCodeResult.Offline -> _state.value = _state.value.copy(
                    sendingCode = false,
                    offlineMessage = "You need a connection to sign in for the first time. " +
                        "Once you're in, you can keep working offline.",
                )
                is AuthRepository.RequestCodeResult.Failed -> _state.value = _state.value.copy(
                    sendingCode = false,
                    phoneError = "We couldn't send the code. Tap Send code to try again.",
                )
            }
        }
    }

    fun onCodeChanged(code: String) {
        _state.value = _state.value.copy(code = code, codeError = null)
        if (code.length == 5) verify()
    }

    fun verify() {
        val s = _state.value
        if (s.code.length < 5 || s.verifying) return
        _state.value = s.copy(verifying = true, codeError = null)
        viewModelScope.launch {
            when (auth.verifyCode(s.phone, s.code)) {
                is AuthRepository.VerifyResult.Success -> {
                    store.saveSession(s.phone)
                    _state.value = _state.value.copy(verifying = false, signedIn = true)
                }
                is AuthRepository.VerifyResult.WrongCode -> _state.value = _state.value.copy(
                    verifying = false,
                    codeError = "That code isn't right. Check and try again.",
                )
                is AuthRepository.VerifyResult.Expired -> _state.value = _state.value.copy(
                    verifying = false,
                    codeError = "That code has expired.",
                )
                is AuthRepository.VerifyResult.Offline -> _state.value = _state.value.copy(
                    verifying = false,
                    codeError = "You need a connection to sign in for the first time.",
                )
            }
        }
    }

    fun resend() {
        if (_state.value.resendSeconds > 0) return
        _state.value = _state.value.copy(code = "", codeError = null)
        sendCode()
    }

    fun changeNumber() {
        countdownJob?.cancel()
        _state.value = _state.value.copy(codeSent = false, code = "", codeError = null, resendSeconds = 0)
    }

    private fun startResendCountdown() {
        countdownJob?.cancel()
        countdownJob = viewModelScope.launch {
            _state.value = _state.value.copy(resendSeconds = 60)
            while (_state.value.resendSeconds > 0) {
                delay(1000)
                _state.value = _state.value.copy(resendSeconds = _state.value.resendSeconds - 1)
            }
        }
    }

    // --- PIN (W2c proposal) ---

    suspend fun hasPin(): Boolean = store.pin.first() != null

    fun savePin(pin: String, onDone: () -> Unit) {
        viewModelScope.launch {
            store.savePin(pin)
            store.markPinPromptShown()
            onDone()
        }
    }

    fun skipPin(onDone: () -> Unit) {
        viewModelScope.launch {
            store.markPinPromptShown()
            onDone()
        }
    }

    suspend fun checkPin(pin: String): Boolean = store.pin.first() == pin
}
