type FeedbackCommentProps = {
  categoryScores?: { name: string; score: number; comment: string }[];
};

const FeedbackComment = ({ categoryScores }: FeedbackCommentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2>Breakdown of the Interview:</h2>
      {categoryScores?.map((category, index) => (
        <div key={index}>
          <p className="font-bold">
            {index + 1}. {category.name} ({category.score}/100)
          </p>
          <p>{category.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackComment;
