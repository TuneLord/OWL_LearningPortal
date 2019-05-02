// Kreator akcji - status logowania
export const loginStatus = isLogin => {
    // Akcja
    return {
        type: 'LOGIN_ACCESS',
        payload: isLogin
    };
};