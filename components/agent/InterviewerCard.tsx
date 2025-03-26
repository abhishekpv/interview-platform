import Image from "next/image";

type InterviewerCardProps = {
  isSpeaking: boolean;
};

const InterviewerCard = ({ isSpeaking }: InterviewerCardProps) => {
  return (
    <div className="card-interviewer">
      <div className="avatar">
        <Image
          src={"/ai-avatar.png"}
          alt="vapi"
          width={65}
          height={54}
          className="object-cover"
        />
        {isSpeaking && <span className="animate-speak" />}
      </div>
      <h3>AI Interviewer</h3>
    </div>
  );
};

export default InterviewerCard;
