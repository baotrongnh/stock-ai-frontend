import axiosClient from './axiosClient';

export interface Podcast {
    podcastId: number;
    title: string;
    description: string;
    audioUrl: string;
    duration: number | null;
    fileSize: number | null;
    fileFormat: string | null;
    status: 'draft' | 'published' | 'archived';
    playCount: number;
    isFeatured: boolean;
    tags: string[] | string | null; // Handle both array and string cases
    uploadedBy: string | null;
    createdAt: string;
    updatedAt: string;
    client: {
        clientId: number;
        clientName: string;
    };
}

export interface PodcastListResponse {
    error: boolean;
    data: {
        data: Podcast[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    };
    message: string;
}

export interface PodcastResponse {
    error: boolean;
    data: Podcast;
    message: string;
}

export interface PlayCountResponse {
    error: boolean;
    data: {
        podcastId: number;
        playCount: number;
    };
    message: string;
}

// Get all published podcasts (public)
export const getPublishedPodcasts = async (params?: {
    page?: number;
    pageSize?: number;
    featured?: boolean;
    tags?: string[];
}): Promise<PodcastListResponse> => {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString());
    if (params?.featured !== undefined) searchParams.append('featured', params.featured.toString());
    if (params?.tags && params.tags.length > 0) searchParams.append('tags', params.tags.join(','));

    const response = await axiosClient.get(`/public/podcasts?${searchParams}`);
    return response.data;
};

// Get featured podcasts (public)
export const getFeaturedPodcasts = async (params?: {
    page?: number;
    pageSize?: number;
}): Promise<PodcastListResponse> => {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString());

    const response = await axiosClient.get(`/public/podcasts/featured?${searchParams}`);
    return response.data;
};

// Get podcast by ID (public)
export const getPodcastById = async (id: number): Promise<PodcastResponse> => {
    const response = await axiosClient.get(`/public/podcasts/${id}`);
    return response.data;
};

// Increment play count (public)
export const incrementPlayCount = async (id: number): Promise<PlayCountResponse> => {
    const response = await axiosClient.post(`/public/podcasts/${id}/play`);
    return response.data;
};

// Utility function to format duration
export const formatDuration = (seconds: number | null): string => {
    if (!seconds) return '00:00';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Utility function to format file size
export const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return 'Unknown size';

    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
};

// Utility function to format relative time
export const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Vừa xong';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} tháng trước`;
    return `${Math.floor(diffInSeconds / 31536000)} năm trước`;
};
