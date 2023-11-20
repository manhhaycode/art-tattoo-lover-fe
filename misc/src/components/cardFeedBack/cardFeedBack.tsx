import React, { useState } from 'react';

const FeedbackCard: React.FC = () => {
  const [rating, setRating] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value);
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Rating:', rating);
    console.log('Feedback:', feedback);

    setRating('');
    setFeedback('');
  };
  return (
    <div className="feedback-card">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Rating:
            <input
              type="radio"
              name="rating"
              value="excellent"
              checked={rating === 'excellent'}
              onChange={handleRatingChange}
            />
            Excellent
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="good"
              checked={rating === 'good'}
              onChange={handleRatingChange}
            />
            Good
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="average"
              checked={rating === 'average'}
              onChange={handleRatingChange}
            />
            Average
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="poor"
              checked={rating === 'poor'}
              onChange={handleRatingChange}
            />
            Poor
          </label>
        </div>
        <div>
          <label>
            Feedback:
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              rows={4}
              cols={50}
              placeholder="Enter your feedback here..."
            />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackCard;