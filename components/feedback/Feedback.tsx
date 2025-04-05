type FeedbackProps = {
  title: string;
  feedbacks?: string[];
};
const Feedback = ({ title, feedbacks }: FeedbackProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3>{title}</h3>
      <ul>
        {feedbacks?.map((feedback, index) => (
          <li key={index}>{feedback}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
