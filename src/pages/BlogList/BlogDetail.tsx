import { PostServices } from "@/apis/posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Eye,
  MessageSquare,
  Send,
  Share2,
  ThumbsUp,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { CommentService, type CreateCommentPayload } from "@/apis/comments";

interface TComment {
  commentId: number;
  postId: number;
  userId: number;
  parentCommentId?: number;
  content: string;
  isEdited: boolean;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl?: string;
  };
}

const DEFAULT_IMAGE =
  "https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";

function getViewCount(post: any) {
  return typeof post.viewCount === "number" ? post.viewCount : 0;
}

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<TComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [createCommentLoading, setCreateCommentLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  // In real app, this should come from authentication context
  const currentUser = {
    id: Number(localStorage.getItem("userId")),
    fullName: "Current User",
    email: "user@example.com"
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await PostServices.getPostById(Number(id));
        setPost(res.result);
      } catch {
        setPost(null);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  // Always fetch comments from API, filter by postId
  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      setCommentsLoading(true);
      setError(null);
      try {
        const res = await CommentService.getComments(1, 100);
        console.log("API Response:", res);
        
        // Try different response structures
        let arr: TComment[] = [];
       
        if (Array.isArray(res.data)) {
          arr = res.data;
        } 
        
        
        console.log("Comments array:", arr);
        const postComments = arr.filter((comment: TComment) => comment.postId === Number(id));
        setComments(postComments);
      } catch (e) {
        setError("Unable to load comments");
        setComments([]);
      }
      setCommentsLoading(false);
    };
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !id || createCommentLoading) return;
    setCreateCommentLoading(true);
    setError(null);
    try {
      const commentData: CreateCommentPayload = {
        postId: Number(id),
        userId: currentUser.id,
        content: newComment.trim(),
        likeCount: 0
      };
      const response = await CommentService.createComment(commentData);
      if (response && response.result) {
        const newCommentData: TComment = {
          ...response.result,
          user: currentUser
        };
        setComments([newCommentData, ...comments]);
        setNewComment("");
      }
    } catch (e) {
      setError("Unable to create comment. Please try again.");
    }
    setCreateCommentLoading(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await CommentService.deleteCommentById(commentId);
      setComments(comments.filter(c => c.commentId !== commentId));
    } catch { 
      setError("Unable to delete comment");
    }
  };

  const handleUpdateComment = async (commentId: number) => {
    try {
      await CommentService.updateCommentById(commentId, { content: editContent, isEdited: true });
      setComments(comments.map(c =>
        String(c.commentId) === String(commentId) ? { ...c, content: editContent, isEdited: true } : c
      ));
      setEditingCommentId(null);
      setEditContent("");
    } catch {
      setError("Unable to update comment");
    }
  };

  const handleReply = async (parentCommentId: number, replyContent: string) => {
    const commentData: CreateCommentPayload = {
      postId: Number(id),
      userId: currentUser.id,
      content: replyContent,
      parentCommentId,
      likeCount: 0
    };
    await CommentService.createComment(commentData);
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/blog">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="flex-1 overflow-y-auto">
          <article className="max-w-4xl mx-auto p-6">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-red-100 text-red-700">
                  {post.category}
                </Badge>
                {post.tags?.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {getViewCount(post)} views
                </div>
              </div>

              <img
                src={post.sourceUrl || DEFAULT_IMAGE}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* Article Footer */}
            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Like Article
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    {comments.length} comments
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Comments ({comments.length})
              </h3>

              {/* Add Comment */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Write your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="mb-3 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                      <Button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments List */}
              <div className="space-y-4">
                
                {comments.map((comment) => (
                  <Card key={comment.commentId}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">
                              {comment.user?.fullName}
                            </span>
                            <span className="text-sm text-gray-500">
                              {comment.createdAt}
                            </span>
                          </div>
                          {editingCommentId === comment.commentId ? (
                            <div>
                              <Textarea
                                value={editContent}
                                onChange={e => setEditContent(e.target.value)}
                                className="mb-2"
                              />
                              <Button
                                onClick={() => handleUpdateComment(comment.commentId)}
                                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white"
                                size="sm"
                                disabled={!editContent.trim()}
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditContent("");
                                }}
                                variant="outline"
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <p className="text-gray-800 mb-3">{comment.content}</p>
                          )}
                          <div className="flex items-center gap-4">
                            {Number(comment.userId) === Number(currentUser.id) && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600"
                                  onClick={() => {
                                    setEditingCommentId(comment.commentId);
                                    setEditContent(comment.content);
                                  }}
                                >
                                  Update
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => handleDeleteComment(comment.commentId)}
                                >
                                  Delete
                                </Button>
                              </>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-red-600"
                            >
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {comment.likeCount}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600"
                              onClick={() => handleReply(comment.commentId, "Reply to this comment")}
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
