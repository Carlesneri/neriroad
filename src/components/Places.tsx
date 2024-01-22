import type { PlaceResult } from "../types"
import { Card } from "./Card.tsx"

export const Places = ({ places }: { places: PlaceResult[] }) => {
	return (
		<div class="flex flex-col p-3 gap-3">
			{places.map((place) => {
				return <Card place={place} key={place.id} />
			})}
		</div>
	)
}
