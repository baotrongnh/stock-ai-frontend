import React, { useState } from 'react';
import { Button } from './button';
import { Textarea } from './textarea';
import { postComment } from '@/apis/Comment';

interface CommentFormProps {
    postId: number;                    // Truyền từ component cha
    parentCommentId?: number;          // 0 = comment mới, >0 = reply
    onCommentAdded?: () => void;       // Callback sau khi thêm thành công
    placeholder?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
    postId,
    parentCommentId = 0,
    onCommentAdded,
    placeholder = "Viết bình luận của bạn..."
}) => {
    const [noiDung, setNoiDung] = useState('');
    const [dangGui, setDangGui] = useState(false);
    const [loi, setLoi] = useState('');

    // Validation đơn giản
    const kiemTraHopLe = () => {
        if (!noiDung.trim()) {
            setLoi('Vui lòng nhập nội dung bình luận');
            return false;
        }
        if (noiDung.trim().length < 3) {
            setLoi('Bình luận phải có ít nhất 3 ký tự');
            return false;
        }
        return true;
    };

    // Xử lý submit
    const xuLyGui = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!kiemTraHopLe()) return;

        setLoi('');
        setDangGui(true);

        try {
            // Gọi API - backend tự lấy userId từ token
            await postComment({
                postId: postId,
                parentCommentId: parentCommentId,
                content: noiDung.trim(),
                isEdited: false,
                likeCount: 0
            });

            // Thành công
            setNoiDung('');
            onCommentAdded?.();         // Callback để reload comments
            
        } catch (error: any) {
            console.error('Lỗi gửi comment:', error);
            
            // Error handling đơn giản
            if (error.response?.status === 401) {
                setLoi('Vui lòng đăng nhập để bình luận');
            } else {
                setLoi('Không thể gửi bình luận. Vui lòng thử lại');
            }
        } finally {
            setDangGui(false);
        }
    };

    return (
        <form onSubmit={xuLyGui} className="space-y-3">
            <Textarea
                value={noiDung}
                onChange={(e) => {
                    setNoiDung(e.target.value);
                    if (loi) setLoi(''); // Clear error khi user gõ
                }}
                placeholder={placeholder}
                disabled={dangGui}
                className={`min-h-[80px] ${loi ? 'border-red-500' : ''}`}
            />
            
            {/* Hiển thị lỗi */}
            {loi && (
                <p className="text-sm text-red-600">{loi}</p>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2">
                {noiDung.trim() && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            setNoiDung('');
                            setLoi('');
                        }}
                        disabled={dangGui}
                    >
                        Hủy
                    </Button>
                )}
                
                <Button
                    type="submit"
                    disabled={dangGui || !noiDung.trim()}
                >
                    {dangGui ? 'Đang gửi...' : (parentCommentId > 0 ? 'Trả lời' : 'Bình luận')}
                </Button>
            </div>
        </form>
    );
}; 