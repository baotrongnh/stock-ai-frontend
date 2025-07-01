// src/components/GoogleButton.tsx
import { useEffect } from 'react';
import { loginGoogle } from '../../../apis/login';

declare global {
    interface Window {
        google?: any;
    }
}

interface JwtPayload {
    name: string;
    given_name: string;
    family_name: string;
    sub: string;
    picture: string;
    email: string;
    [key: string]: any;
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

export const GoogleButton = () => {
    const sendToken = async (token: string) => {
        try {
            const response = await loginGoogle(token); // Gửi về backend
            console.log('Server response:', response);
        } catch (error) {
            console.error('Error sending token:', error);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
                    callback: (response: { credential: string }) => {
                        console.log('Received credential:', response.credential);
                        const userInfo = decodeJWT(response.credential);
                        console.log('Decoded user info:', userInfo);
                        sendToken(response.credential);
                    },
                    ux_mode: 'popup',
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('google-button'),
                    {
                        theme: 'outline',
                        size: 'large',
                        shape: 'rectangular',
                        text: 'signin_with',
                        logo_alignment: 'left',
                    }
                );
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="google-button"></div>
    );
};
