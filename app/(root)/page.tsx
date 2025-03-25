import HeroCard from "@/components/HeroCard";
import InterviewCard from "@/components/interviewCard/InterviewCard";
import { dummyInterviews } from "@/constants";

const Home = () => {
  return (
    <>
      <HeroCard />
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {/* <p>You haven&apos;t taken any interviews yet</p> */}
          {dummyInterviews.map((interview) => {
            return <InterviewCard key={interview.id} {...interview} />;
          })}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {/* <p>There are no interviews available</p> */}
          {dummyInterviews.map((interview) => {
            return <InterviewCard key={interview.id} {...interview} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
