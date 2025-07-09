import React from 'react';

interface RatingProps {
	rating: number; // e.g. 3.5
	max?: number; // default is 5
}

export const ReviewRating: React.FC<RatingProps> = ({ rating, max = 5 }) => {
	return (
		<div className="flex">
			{Array.from({ length: max }).map((_, index) => {
				const starValue = index + 1;
				let fillPercentage = 0;

				if (rating >= starValue) {
					fillPercentage = 100;
				} else if (rating > index && rating < starValue) {
					fillPercentage = (rating - index) * 100; // e.g. 0.5 * 100 = 50
				}

				return (
					<div key={index} className="relative w-5 h-5">
						{/* Empty base star */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M9.99995 14.1663L5.10162 17.158L6.43328 11.5747L2.07495 7.84134L7.79578 7.38301L9.99995 2.08301L12.2041 7.38301L17.9258 7.84134L13.5666 11.5747L14.8983 17.158L9.99995 14.1663Z"
								fill="#E0E0E0"
							/>
						</svg>

						{/* Filled portion */}
						{fillPercentage > 0 && (
							<div
								className="absolute top-0 left-0 overflow-hidden"
								style={{ width: `${fillPercentage}%` }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
								>
									<path
										d="M9.99995 14.1663L5.10162 17.158L6.43328 11.5747L2.07495 7.84134L7.79578 7.38301L9.99995 2.08301L12.2041 7.38301L17.9258 7.84134L13.5666 11.5747L14.8983 17.158L9.99995 14.1663Z"
										fill="#F38744"
									/>
								</svg>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};
