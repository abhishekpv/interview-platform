import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import DisplayTechIcons from "./DisplayTechIcons";

type InterviewDetailsHeaderProps = {
  role: string;
  techStack: string[];
  type: string;
};

const InterviewDetailsHeader = ({
  role,
  techStack,
  type,
}: InterviewDetailsHeaderProps) => {
  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="flex sm:flex-row flex-col gap-4 items-center ">
        <div className="flex flex-row items-center gap-4">
          <Image
            src={getRandomInterviewCover()}
            alt={"cover-image"}
            width={40}
            height={40}
            className="rounded-full object-cover size-[40px]"
          />
          <h3 className="capitalize">{role} Interview</h3>
        </div>
        <DisplayTechIcons techStack={techStack} />
      </div>
      <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
        {type}
      </p>
    </div>
  );
};

export default InterviewDetailsHeader;
