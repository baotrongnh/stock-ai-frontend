// src/components/GoogleButton.tsx
import { useEffect } from 'react';
import { loginGoogle } from '../../../apis/login';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { UserServices } from '@/apis/user';

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: unknown) => void;
                    renderButton: (element: HTMLElement | null, config: unknown) => void;
                };
            };
        };
    }
}

interface JwtPayload {
    name: string;
    given_name: string;
    family_name: string;
    sub: string;
    picture: string;
    email: string;
    [key: string]: unknown;
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
    const navigate = useNavigate()

    useEffect(() => {
        const sendToken = async (token: string) => {
            try {
                const response = await loginGoogle(token);
                console.log('Server response:', response);

                if (response?.access_token && response?.user?.userId) {
                    // Save tokens and user info to localStorage
                    localStorage.setItem("userId", response.user.userId);
                    localStorage.setItem("accessToken", response.access_token);
                    localStorage.setItem("refreshToken", response.refresh_token);

                    try {
                        // Get user profile
                        const userProfile = await UserServices.getUserById(response.user.userId);

                        toast.success("Google login successful!");
                        setTimeout(() => {
                            navigate("/blog", { state: { user: userProfile.data } });
                        }, 1000);
                    } catch (profileError) {
                        console.error("Error fetching user profile:", profileError);
                        // Still navigate even if profile fetch fails
                        toast.success("Google login successful!");
                        setTimeout(() => {
                            navigate("/blog");
                        }, 1000);
                    }
                } else {
                    toast.error("Google login failed");
                    console.error("Invalid response structure:", response);
                }
            } catch (error) {
                console.error('Error sending token:', error);
                toast.error("Google login failed. Please try again.");
            }
        };

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
    }, [navigate]);

    return (
        <div id="google-button"></div>
    );
};
