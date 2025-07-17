import type { ReactNode } from 'react';

export interface UserProfile {
    userId: string
    firstName: string
    lastName: string
    email: string
    fullName: string
    avatar: string
    avatarFile?: File | null
    provider: string
    socialId: string
    status: number
    isExpert: boolean
    createdAt: string
    updatedAt: string
    joinDate: string
    refreshToken: string
}

export interface UserBackendFields {
    provider: string
    socialId: string
    status: string
    passwordHash: string
}

export interface TabItem {
    id: string;
    label: string;
    icon: ReactNode;
}

export interface FavoritePost {
    postId: number;
    title: string;
    content: string;
    expertId: string;
    stockId: number;
    sourceUrl: string;
    viewCount: number;
    session: number;
    likeCount: number;
    upvoteCount: number;
    downvoteCount: number;
    favoriteCount: number;
    createdAt: string;
    updatedAt: string;
    sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
    level: string;
    topic: string;
    status: string;
    expert: {
        userId: string;
        email: string;
        provider: string;
        passwordHash: string | null;
        fullName: string;
        avatarUrl: string;
        socialId: string;
        status: number;
        isExpert: boolean;
        createdAt: string;
        updatedAt: string;
        refreshToken: string;
    };
    stock: {
        stockId: number;
        symbol: string;
        companyName: string;
        stockExchangeId: number | null;
        url: string;
    };
}

export interface FavoritesResponse {
    error: boolean;
    data: {
        data: FavoritePost[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    };
    message: string;
}
