export interface Comment {
    commentId: number;
    postId: number;
    userId: string;
    parentCommentId?: number | null;
    content: string;
    isEdited?: boolean;
    likeCount?: number;
    createdAt: string;
    updatedAt: string;
    user?: {
        userId: string;
        fullName: string;
        avatarUrl?: string;
        email?: string;
    };
    children?: Comment[];
}

export interface Post {
    viewCount?: number;
    likeCount?: number;
    upvoteCount?: number;
    downvoteCount?: number;
    postId: number;
    title: string;
    content: string;
    sentiment?: string;
    level?: string;
    topic?: string;
    session?: number;
    status?: string;
    tags?: string[];
    author?: string;
    createdAt: string;
    sourceUrl?: string;
    expertId?: number;
    isFavorited?: boolean;
    userVote?: "UPVOTE" | "DOWNVOTE" | null;
    userVoteType?: "UPVOTE" | "DOWNVOTE" | null;
    userHasVoted?: boolean;
    userHasFavorited?: boolean;
    userVoteCreatedAt?: string;
    userFavoriteCreatedAt?: string;
    expert?: {
        fullName: string;
        avatarUrl?: string;
    };
    stock?: {
        symbol: string;
        companyName: string;
    };
}
