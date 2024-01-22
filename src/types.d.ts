export interface SearchNearbyBodyRequest {
	languageCode?: string
	regionCode?: string
	includedTypes: [string]
	excludedTypes?: [string]
	includedPrimaryTypes?: [string]
	excludedPrimaryTypes?: [string]
	maxResultCount?: integer
	locationRestriction: {
		circle: {
			center: LatLng
			radius: number
		}
	}
	rankPreference?: RankPreference
}

interface LatLng {
	latitude: number
	longitude: number
}

export enum RankPreference {
	RANK_PREFERENCE_UNSPECIFIED,
	POPULARITY,
	DISTANCE,
}

export interface PlaceResult {
	name: string
	id: string
	types: string[]
	formattedAddress: string
	addressComponents: AddressComponent[]
	plusCode: PlusCode
	location: Location
	viewport: Viewport
	rating: number
	googleMapsUri: string
	utcOffsetMinutes: number
	adrFormatAddress: string
	businessStatus: string
	userRatingCount: number
	iconMaskBaseUri: string
	iconBackgroundColor: string
	displayName: DisplayName
	primaryTypeDisplayName: PrimaryTypeDisplayName
	primaryType: string
	shortFormattedAddress: string
	reviews: Review[]
	photos: Photo[]
	restroom: boolean
	accessibilityOptions: AccessibilityOptions
}

export interface AddressComponent {
	longText: string
	shortText: string
	types: string[]
	languageCode: string
}

export interface PlusCode {
	globalCode: string
	compoundCode: string
}

export interface Location {
	latitude: number
	longitude: number
}

export interface Viewport {
	low: Low
	high: High
}

export interface Low {
	latitude: number
	longitude: number
}

export interface High {
	latitude: number
	longitude: number
}

export interface DisplayName {
	text: string
	languageCode: string
}

export interface PrimaryTypeDisplayName {
	text: string
	languageCode: string
}

export interface Review {
	name: string
	relativePublishTimeDescription: string
	rating: number
	text: Text
	originalText: OriginalText
	authorAttribution: AuthorAttribution
	publishTime: string
}

export interface Text {
	text: string
	languageCode: string
}

export interface OriginalText {
	text: string
	languageCode: string
}

export interface AuthorAttribution {
	displayName: string
	uri: string
	photoUri: string
}

export interface Photo {
	name: string
	widthPx: number
	heightPx: number
	authorAttributions: AuthorAttribution2[]
}

export interface AuthorAttribution2 {
	displayName: string
	uri: string
	photoUri: string
}

export interface AccessibilityOptions {
	wheelchairAccessibleParking: boolean
	wheelchairAccessibleEntrance: boolean
	wheelchairAccessibleRestroom: boolean
}
