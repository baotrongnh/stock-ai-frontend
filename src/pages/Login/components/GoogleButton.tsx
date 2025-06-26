import axios from 'axios';
import { useEffect } from 'react';

// Add type declaration for the global callback
declare global {
    interface Window {
        handleCredentialResponse?: (response: { credential: string }) => void;
    }
}

export const GoogleButton = () => {
    interface JwtPayload {
        name: string;
        given_name: string;
        family_name: string;
        sub: string;
        picture: string;
        email: string;
        [key: string]: any; // For any extra fields Google may add
    }

    function decodeJWT(token: string): JwtPayload {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    }

    const sendToken = async (token: string) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_API_URL}/auth/google`,
                { idToken: token }
            );
            console.log('Token sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending token:', error);
        }
    };

    useEffect(() => {
        // Load Google Sign-In script
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        // Define the callback function globally
        window.handleCredentialResponse = (response: { credential: string }) => {
            console.log('Encoded JWT ID token: ' + response.credential);
            const responsePayload = decodeJWT(response.credential);
            console.log('Decoded JWT ID token fields:', responsePayload);
            sendToken(response.credential);
        };

        return () => {
            document.body.removeChild(script);
            // Clean up the global callback
            delete window.handleCredentialResponse;
        };
    }, []);

    return (
        <>
            <div
                id="g_id_onload"
                data-client_id="383857528826-l5t7hq4nesilhjfoat6t33v8ba74k54h.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-login_uri="http://localhost:3000/auth/google"
                data-auto_prompt="false"
                data-callback="handleCredentialResponse"
            ></div>
            <div
                className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
            ></div>
        </>
    );
};