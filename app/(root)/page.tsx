import HeroCard from "@/components/HeroCard";
import InterviewCard from "@/components/interviewCard/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

const Home = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id ?? ""),
    await getLatestInterviews({
      userId: user?.id ?? "",
    }),
  ]);

  const hasPastInterviews = !!userInterviews?.length;
  const hasUpcomingInterviews = !!latestInterviews?.length;
  return (
    <>
      <HeroCard />
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews.map((interview) => {
              return (
                <InterviewCard
                  key={interview.id}
                  {...interview}
                  userId={user?.id}
                />
              );
            })
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews.map((interview) => {
              return (
                <InterviewCard
                  key={interview.id}
                  {...interview}
                  userId={user?.id}
                />
              );
            })
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
