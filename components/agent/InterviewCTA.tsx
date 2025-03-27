import { cn } from "@/lib/utils";
import { CallStatus } from "./Agent";

type InterviewCTAProps = {
  handleCall: () => Promise<void>;
  handleDisconnect: () => Promise<void>;
  callStatus: CallStatus;
};

const InterviewCTA = ({
  callStatus,
  handleCall,
  handleDisconnect,
}: InterviewCTAProps) => {
  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <div className="flex w-full justify-center">
      {callStatus !== CallStatus.ACTIVE ? (
        <button className="relative btn-call" onClick={handleCall}>
          <span
            className={cn(
              "absolute animate-ping rounded-full opacity-75",
              callStatus !== CallStatus.CONNECTING && "hidden"
            )}
          />
          <span>{isCallInactiveOrFinished ? "Call" : "..."}</span>
        </button>
      ) : (
        <button className="btn-disconnect" onClick={handleDisconnect}>
          End
        </button>
      )}
    </div>
  );
};

export default InterviewCTA;
