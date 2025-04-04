import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "./DisplayTechIcons";
import DateRating from "./DateRating";
const InterviewCard = ({
  techstack,
  createdAt,
  role,
  type,
  id,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-full sm:w-[360px] min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={80}
            height={80}
            className="rounded-full object-fit size-[80px]"
          />
          <h3 className="mt-5 capitalize">{role} Interview</h3>
          <DateRating date={formattedDate} score={feedback?.totalScore} />
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken the interview yet. Take it now to improve your skills."}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />
          <Button className="btn-primary">
            <Link
              href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
