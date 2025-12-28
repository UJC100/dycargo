export interface AviationstackFlightLive {
  latitude: number;
  longitude: number;
  altitude: number;
  speed_horizontal: number;
}

export interface AviationstackFlight {
  flight_status: string;
  live: AviationstackFlightLive | null;
}

export interface AviationstackResponse {
  data: AviationstackFlight[];
}
