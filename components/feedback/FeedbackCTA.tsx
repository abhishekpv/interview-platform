import Link from "next/link";
import { Button } from "../ui/button";

type FeedbackCTAProps = {
  interviewId: string;
};

const FeedbackCTA = ({ interviewId }: FeedbackCTAProps) => {
  return (
    <div className="buttons">
      <Button className="btn-secondary flex-1">
        <Link href="/" className="flex w-full justify-center">
          <p className="text-sm font-semibold text-primary-200 text-center">
            Back to dashboard
          </p>
        </Link>
      </Button>

      <Button className="btn-primary flex-1">
        <Link
          href={`/interview/${interviewId}`}
          className="flex w-full justify-center"
        >
          <p className="text-sm font-semibold text-black text-center">
            Retake Interview
          </p>
        </Link>
      </Button>
    </div>
  );
};

export default FeedbackCTA;
