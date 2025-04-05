import Feedback from "@/components/feedback/Feedback";
import FeedbackComment from "@/components/feedback/FeedbackComment";
import FeedbackCTA from "@/components/feedback/FeedbackCTA";
import FeedbackHeader from "@/components/feedback/FeedbackHeader";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { redirect } from "next/navigation";

const FeedbackPage = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) {
    redirect("/");
  }

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id ?? "",
  });

  return (
    <section className="section-feedback">
      <FeedbackHeader
        role={interview.role}
        createdAt={feedback?.createdAt}
        totalScore={feedback?.totalScore}
      />
      <p>{feedback?.finalAssessment}</p>
      <FeedbackComment categoryScores={feedback?.categoryScores} />
      <Feedback title="Strengths" feedbacks={feedback?.strengths} />
      <Feedback
        title="Areas for Improvement"
        feedbacks={feedback?.areasForImprovement}
      />
      <FeedbackCTA interviewId={id} />
    </section>
  );
};

export default FeedbackPage;
