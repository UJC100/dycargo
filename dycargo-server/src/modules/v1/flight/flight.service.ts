import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { AviationstackResponse } from './interface/flights.interface';

@Injectable()
export class FlightService {
  private readonly logger = new Logger(FlightService.name);

  async getFlightPosition(flightNumber: string) {
    if (process.env.FLIGHT_MODE === 'mock') {
      // Base coordinates (Manila)
      const baseLat = 14.5995;
      const baseLng = 120.9844;

      // Generate small random offset to simulate movement
      const offset = () => (Math.random() - 0.5) * 0.01; // +/- 0.005 degrees

      return {
        latitude: baseLat + offset(),
        longitude: baseLng + offset(),
        altitude: 35000 + Math.floor(Math.random() * 500), // +/- 500 feet
        speed: 800 + Math.floor(Math.random() * 20), // +/- 20 km/h
        status: 'active',
      };
    } else {
      try {
        const response: AxiosResponse<AviationstackResponse> = await axios.get(
          `${process.env.FLIGHT_API_BASE_URL}/flights`,
          {
            params: {
              access_key: process.env.FLIGHT_API_KEY,
              flight_iata: flightNumber,
            },
          },
        );

        const flight = response.data?.data?.[0];

        if (!flight || !flight.live) {
          return null;
        }

        return {
          latitude: flight.live.latitude,
          longitude: flight.live.longitude,
          altitude: flight.live.altitude,
          speed: flight.live.speed_horizontal,
          status: flight.flight_status, // scheduled | active | landed
        };
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.logger.error(
            `Failed to fetch flight ${flightNumber}`,
            error.message,
          );
        } else {
          this.logger.error(
            `Failed to fetch flight ${flightNumber}`,
            'Unknown error',
          );
        }
      }
    }
  }
}
