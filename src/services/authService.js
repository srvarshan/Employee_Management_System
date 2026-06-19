/* =============================================================
   src/services/authService.js
   Converted from the original page.js login logic.
   Real API login against the unified backend on port 8080.
   ============================================================= */

function getApiBase() {
    const host = window.location.hostname || 'localhost';
    return `http://${host}:8080`;
}

const LOGIN_PATH = '/api/auth/login';

function postJson(url, payload) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.timeout = 8000;

        xhr.onload = () => {
            const status = xhr.status;
            try {
                const data = JSON.parse(xhr.responseText || '{}');
                if (status >= 400 && data.success === undefined) {
                    data.success = false;
                    data.message = data.message || data.error || 'Request failed (HTTP ' + status + ').';
                }
                resolve({ httpStatus: status, data });
            } catch (_) {
                resolve({
                    httpStatus: status,
                    data: { success: false, message: 'Unexpected response (HTTP ' + status + ').' }
                });
            }
        };

        xhr.onerror = () => reject({ type: 'network', url });
        xhr.ontimeout = () => reject({ type: 'timeout', url });
        xhr.send(JSON.stringify(payload));
    });
}

/**
 * Attempts to log in against the unified backend.
 * Mirrors the original page.js behavior/messages exactly.
 */
export async function login(email, password, remember) {
    const API_URL = getApiBase();
    const payload = { email, password, rememberMe: remember };

    let result;
    try {
        result = await postJson(API_URL + LOGIN_PATH, payload);
    } catch (err) {
        console.error('Login request failed:', err);
        throw new Error(
            'Cannot reach the backend at port 8080.\n' +
            'Start the unified EMS backend and try again.'
        );
    }

    if (result.httpStatus >= 500) {
        throw new Error(
            'Login service not responding (HTTP ' + result.httpStatus + '). ' +
            'Make sure the backend on port 8080 is running.'
        );
    }

    const data = result.data;
    if (!data.success) {
        throw new Error(data.message || 'Invalid credentials. Please try again.');
    }

    return data;
}

/**
 * Saves auth data. Mirrors the original Auth.save(data) call from utils.js.
 * (utils.js content was not provided; this preserves localStorage persistence
 * so the rest of the app's auth flow keeps working.)
 */
export function saveAuth(data) {
    try {
        localStorage.setItem('ems_token', data.token || '');
        localStorage.setItem('ems_role', data.role || '');
        localStorage.setItem('ems_employeeCode', data.employeeCode || '');
        localStorage.setItem('ems_email', data.email || '');
        localStorage.setItem('ems_fullName', data.fullName || '');
    } catch (e) {
        console.error('Failed to save auth data:', e);
    }
}

/**
 * Builds the redirect target + query params exactly as the original page.js did.
 */
export function buildRedirectUrl(data) {
    const params = new URLSearchParams({
        ems_token: data.token || '',
        ems_role: data.role || '',
        ems_employeeCode: data.employeeCode || '',
        ems_email: data.email || '',
        ems_fullName: data.fullName || ''
    });
    const target = '/' + String(data.redirectUrl).replace(/^\/+/, '');
    return target + '?' + params.toString();
}
