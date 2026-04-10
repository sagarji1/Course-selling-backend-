import { useState, useEffect } from "react";
import { apiFetch } from "../utils/api";

export function useAuth({ role, initialSignup, initialSignin, pushStatus }) {
    const tokenKey = `coursePlatform${role}Token`;
    const [token, setToken] = useState(() => localStorage.getItem(tokenKey) || "");
    const [signupForm, setSignupForm] = useState(initialSignup);
    const [signinForm, setSigninForm] = useState(initialSignin);

    useEffect(() => {
        if (token) {
            localStorage.setItem(tokenKey, token);
        } else {
            localStorage.removeItem(tokenKey);
        }
    }, [token, tokenKey]);

    const updateSignupForm = (field, value) => {
        setSignupForm((current) => ({ ...current, [field]: value }));
    };

    const updateSigninForm = (field, value) => {
        setSigninForm((current) => ({ ...current, [field]: value }));
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const endpoint = `/api/v1/${role.toLowerCase()}/signup`;
            const data = await apiFetch(endpoint, {
                method: "POST",
                body: JSON.stringify(signupForm),
            });
            setSignupForm(initialSignup);
            pushStatus("success", data.msg || `${role} signup successful.`);
        } catch (error) {
            pushStatus("error", error.message);
        }
    };

    const handleSignin = async (event) => {
        event.preventDefault();
        try {
            const endpoint = `/api/v1/${role.toLowerCase()}/signin`;
            const data = await apiFetch(endpoint, {
                method: "POST",
                body: JSON.stringify(signinForm),
            });
            setToken(data.token || "");
            setSigninForm(initialSignin);
            pushStatus("success", data.msg || `${role} signed in.`);
        } catch (error) {
            pushStatus("error", error.message);
        }
    };

    const logout = () => {
        setToken("");
        pushStatus("success", `${role} session cleared.`);
    };

    return {
        token,
        signupForm,
        signinForm,
        updateSignupForm,
        updateSigninForm,
        handleSignup,
        handleSignin,
        logout,
    };
}
