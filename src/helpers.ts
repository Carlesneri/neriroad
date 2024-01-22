import {
	RankPreference,
	type PlaceResult,
	type SearchNearbyBodyRequest,
} from "./types.d"

const { PUBLIC_GOOGLE_MAPS_API_KEY } = import.meta.env

export async function handleClickSearchPlaces({
	includedTypes,
	lat,
	lng,
}: {
	includedTypes: string[]
	lat: number
	lng: number
}) {
	if (!(includedTypes?.length > 0) || !lat || !lng) {
		alert("missing data")

		return
	}

	try {
		const res = await fetch(
			`https://places.googleapis.com/v1/places:searchNearby`,
			{
				method: "POST",
				body: JSON.stringify({
					includedTypes: includedTypes,
					maxResultCount: 20,
					locationRestriction: {
						circle: {
							center: {
								latitude: lat,
								longitude: lng,
							},
							radius: 5000,
						},
					},
					rankPreference: RankPreference.DISTANCE,
				} as SearchNearbyBodyRequest),
				headers: {
					"Content-Type": "application/json",
					"X-Goog-Api-Key": PUBLIC_GOOGLE_MAPS_API_KEY,
					"X-Goog-FieldMask":
						"places.id,places.location,places.formattedAddress,places.displayName,places.name,places.rating,places.googleMapsUri,places.reviews,places.types,places.primaryType",
				},
			}
		)

		const response: { places: PlaceResult[] } = await res.json()

		return response.places
	} catch (error) {
		console.error(error)

		return []
	}
}
