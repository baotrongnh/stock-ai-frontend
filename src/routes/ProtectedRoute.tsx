import { Navigate, useLocation } from 'react-router'
import React from 'react'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation()
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('accessToken')

    const publicPaths = ['/', '/login', '/register', '/admin/login']

    // ✅ Allow public paths
    if (publicPaths.includes(location.pathname)) {
        return <>{children}</>
    }

    // ✅ Default redirect to /login if not authenticated
    if (!userId || !token) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}
