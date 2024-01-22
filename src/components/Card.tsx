import type { PlaceResult } from "../types"

export const Card = ({ place }: { place: PlaceResult }) => {
	return (
		<article class="bg-yellow-300 text-slate-800 p-3 rounded-xl">
			<header class="flex items-center gap-3 justify-between font-bold">
				<p>
					<span class="mr-2">{place.displayName.text}</span>
					{place.primaryType && (
						<span class="text-slate-600 font-light">{place.primaryType}</span>
					)}
					{place.googleMapsUri && (
						<a
							href={place.googleMapsUri}
							target="_blank"
							class="mx-2 inline-flex"
						>
							<img class="w-3" src="/icons/googlemaps.svg"></img>
						</a>
					)}
					<span className="rating">⭐️ {place.rating}</span>
				</p>
			</header>
			<div>
				{place.reviews && (
					<details>
						<summary class="text-bold">Reviews</summary>
						<ul class="ml-3">
							{place.reviews.map((review) => {
								return (
									<li class="text-sm py-1 flex" key={review.publishTime}>
										<p class="">
											{new Array(review.rating).fill("").map((star, i) => (
												<span key={i}>⭐️</span>
											))}
											{review.originalText?.text && (
												<span class="ml-1">{review.originalText.text}</span>
											)}
											{review.relativePublishTimeDescription && (
												<span class="ml-1">
													{review.relativePublishTimeDescription}
												</span>
											)}
										</p>
									</li>
								)
							})}
						</ul>
					</details>
				)}
			</div>
		</article>
	)
}
