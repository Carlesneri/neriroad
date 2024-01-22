import { useEffect, useState } from "preact/hooks"
import type { ChangeEvent } from "preact/compat"
import { includedTypesList } from "../constants"
import { handleClickSearchPlaces } from "../helpers"
import type { PlaceResult } from "../types"
import { Places } from "../components/Places"

export const SearchPlaces = () => {
	const [places, setPlaces] = useState<PlaceResult[]>([])

	const [loc, setLoc] = useState<google.maps.LatLngLiteral | null>(null)
	const [includedTypes, setIncludedTypes] = useState<string[]>([])

	const setPosition = () => {
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			setLoc({ lat: coords.latitude, lng: coords.longitude })
		})
	}

	useEffect(() => {
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			if (result.state === "denied") {
				alert("Please allow the geolocation")
			}

			if (result.state !== "granted") {
				result.onchange = () => {
					if (result.state === "granted") {
						setPosition()
					} else {
						alert("Please allow the geolocation")
					}
				}
			}
		})

		setPosition()
	}, [])

	const addType = (e: ChangeEvent<HTMLInputElement>) => {
		setIncludedTypes((prev) => [...prev, e.currentTarget.value])
		e.currentTarget.value = ""
	}

	const removeType = (type: string) => {
		setIncludedTypes((prev) => {
			const newTypes = prev.filter((t) => t !== type)

			setPlaces((prev) =>
				prev.filter((place) =>
					newTypes.some((type) => type === place.primaryType)
				)
			)

			return newTypes
		})
	}

	async function handleSubmit(e: Event) {
		e.preventDefault()

		if (!loc) return

		const places = await handleClickSearchPlaces({
			includedTypes,
			lat: Number(loc.lat),
			lng: Number(loc.lng),
		})

		if (!places) return

		setPlaces(places)
	}

	return (
		<main class="flex flex-col justify-center w-full py-5 px-3 m-auto max-w-[768px]">
			<div class="flex flex-col items-center gap-3">
				<div class="mt-3 flex gap-2 justify-center align-middle min-h-8">
					{loc && (
						<>
							<span>Latitude: {loc.lat}</span>
							<span>Longitude: {loc.lng}</span>
						</>
					)}
				</div>

				<form
					class="flex flex-col gap-3 items-center w-full"
					onSubmit={handleSubmit}
				>
					<label
						for="search"
						class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
					>
						Search
					</label>

					<div class="relative w-full">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg
								class="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</div>
						<input
							type="text"
							list="includedTypesList"
							class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Restaurant, Train Station..."
							onChange={addType}
						/>

						<datalist id="includedTypesList">
							{includedTypesList.map((type) => (
								<option value={type} />
							))}
						</datalist>
					</div>

					{includedTypes.length > 0 && (
						<ul class="flex flex-wrap gap-3 items-start w-full">
							{Array.from(new Set(includedTypes)).map((type) => (
								<li class="list-none pr-3 pl-2 py-1 text-pink-700 bg-green-200 text-sm rounded-full flex items-center">
									<button
										class="text-xs pr-2 text-red-600 border-red-600"
										onClick={() => removeType(type)}
									>
										❌
									</button>
									<span>{type}</span>
								</li>
							))}
						</ul>
					)}

					{loc && includedTypes.length > 0 && (
						<button
							type="submit"
							class="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 w-fit  transition-all text-pink-700"
						>
							<span class="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
								Search Places
							</span>
						</button>
					)}
				</form>
			</div>

			{places.length > 0 && <Places places={places} />}
		</main>
	)
}
