import InterviewerCard from "./InterviewerCard";
import UserCard from "./UserCard";
import InterviewCTA from "./InterviewCTA";
import { cn } from "@/lib/utils";

export enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = " CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

type AgentProps = {
  userName: string;
};

const Agent = ({ userName }: AgentProps) => {
  const isSpeaking = true;
  const callStatus = CallStatus.ACTIVE;
  const messages = [
    "What is your message?",
    "My name is John Doe, nice to meet you!",
  ];

  const lastMessage = messages[messages.length - 1];
  return (
    <>
      <div className="call-view">
        <InterviewerCard isSpeaking={isSpeaking} />
        <UserCard userName={userName} />
      </div>
      {!!messages.length && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      <InterviewCTA callStatus={callStatus} />
    </>
  );
};

export default Agent;
