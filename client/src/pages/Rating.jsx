import { useState } from "react";
import axios from "axios";

function Rating() {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");

    const submitRating = async () => {
        if (rating === 0) {
            setMessage("Please select a rating first.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/ratings",
                {
                    rating,
                    comment
                }
            );

            setMessage("Thank you for your feedback! ⭐");

            setRating(0);
            setHoverRating(0);
            setComment("");
        } catch (error) {
            console.error("Error submitting rating:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to submit your rating."
            );
        }
    };

    return (
        <div className="rating-page">
            <div className="rating-card">
                <h1>Rate Your Experience</h1>

                <p className="rating-subtitle">
                    We'd love to hear what you think about VNREats.
                </p>

                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className={
                                star <= (hoverRating || rating)
                                    ? "star active"
                                    : "star"
                            }
                            onClick={() => setRating(star)}
                            onMouseEnter={() =>
                                setHoverRating(star)
                            }
                            onMouseLeave={() =>
                                setHoverRating(0)
                            }
                        >
                            ★
                        </button>
                    ))}
                </div>

                <p className="rating-label">
                    {rating === 0
                        ? "Select a rating"
                        : `${rating} out of 5 stars`}
                </p>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience (optional)"
                    rows="5"
                />

                <button
                    className="submit-rating-btn"
                    onClick={submitRating}
                >
                    Submit Rating
                </button>

                {message && (
                    <p className="rating-message">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Rating;