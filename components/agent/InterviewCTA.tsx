import { cn } from "@/lib/utils"
import { CallStatus } from "./Agent"

type InterviewCTAProps={
    callStatus:CallStatus
}

const InterviewCTA = ({callStatus}:InterviewCTAProps) => {
  return (
     <div className="flex w-full justify-center">
            {callStatus !== CallStatus.ACTIVE ? (
              <button className="relative btn-call">
                <span
                  className={cn(
                    "absolute animate-ping rounded-full opacity-75",
                    callStatus !== CallStatus.CONNECTING && "hidden"
                  )}
                />
                <span>
                  {callStatus === CallStatus.INACTIVE ||
                  callStatus === CallStatus.FINISHED
                    ? "FINISHED"
                    : "..."}
                </span>
              </button>
            ) : (
              <button className="btn-disconnect">End</button>
            )}
          </div>
  )
}

export default InterviewCTA