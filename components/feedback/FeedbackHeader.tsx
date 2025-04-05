import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

type FeedbackHeaderProps = {
  role: string;
  createdAt?: string;
  totalScore?: number;
};
const FeedbackHeader = ({
  role,
  createdAt,
  totalScore,
}: FeedbackHeaderProps) => {
  return (
    <>
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview - <span className="capitalize">{role}</span>{" "}
          Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center ">
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression:{" "}
              <span className="text-primary-200 font-bold">
                {totalScore ?? "--"}
              </span>
              /100
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>
              {createdAt
                ? dayjs(createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default FeedbackHeader;
