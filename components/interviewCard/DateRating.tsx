import Image from "next/image";

type DateRatingProps = {
  date: string;
  score?: number;
};

const DateRating = ({ date, score }: DateRatingProps) => {
  return (
    <div className="flex flex-row gap-5 mt-3">
      <div className="flex flex-row gap-2">
        <Image src={"/calendar.svg"} alt="calendar" height={22} width={22} />
        <p>{date}</p>
      </div>
      <div className="flex flex-row gap-2">
        <Image src={"/calendar.svg"} alt="calendar" height={22} width={22} />
        <p>{score || "---"}/100</p>
      </div>
    </div>
  );
};

export default DateRating;
