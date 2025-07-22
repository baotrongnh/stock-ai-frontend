import { ReportServices } from "@/apis/reports";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ReportButtonProps {
    postId: number;
}

export function ReportButton({ postId }: ReportButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitReport = async () => {
        if (!reason.trim()) {
            toast.error("Please provide a reason for the report");
            return;
        }

        setIsSubmitting(true);
        try {
            await ReportServices.createReport({
                postId,
                reason,
                status: "PENDING"
            });

            toast.success("Report submitted successfully", {
                duration: 3000,
                style: {
                    background: '#10B981',
                    color: '#fff',
                },
            });
            setReason("");
            setIsOpen(false);
        } catch (error) {
            console.error('Error submitting report:', error);
            toast.error("Failed to submit report");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200"
                    title="Report this post"
                >
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Report Post</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="report-reason" className="mb-2 block">
                        Please explain why you're reporting this post:
                    </Label>
                    <Textarea
                        id="report-reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Describe the issue with this post..."
                        className="h-32"
                    />
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleSubmitReport}
                        disabled={isSubmitting}
                        className="hover:text-white hover:bg-red-500"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Report"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
