import Agent from "@/components/agent/Agent";
import InterviewDetailsHeader from "@/components/interviewCard/InterviewDetailsHeader";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);
  if (!interview) {
    redirect("/");
  }

  return (
    <>
      <InterviewDetailsHeader
        role={interview.role}
        techStack={interview.techstack}
        type={interview.type}
      />
      <Agent
        userName={user?.name ?? ""}
        userId={user?.id}
        type="interview"
        interviewId={interview.id}
        questions={interview.questions}
      />
    </>
  );
};

export default Page;
