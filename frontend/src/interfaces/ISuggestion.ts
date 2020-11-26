export default interface ISuggestion {
  id?: string;
  description: string;
  url?: string;
  plural?: string;
  pronoum?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  placeId?: string;
}
