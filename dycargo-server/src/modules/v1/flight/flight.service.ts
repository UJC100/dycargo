import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { AviationstackResponse } from './interface/flights.interface';

const mockFlights = new Map<
  string,
  {
    startTime: number;
    durationMs: number;
  }
>();

@Injectable()
export class FlightService {
  private readonly logger = new Logger(FlightService.name);

  async getFlightPosition(flightNumber: string) {
    if (process.env.FLIGHT_MODE === 'mock') {
      const ORIGIN = { lat: 14.5995, lng: 120.9844 }; // Manila
      const DESTINATION = { lat: 6.5244, lng: 3.3792 }; // Lagos

      const TOTAL_DURATION_MS = 60 * 1000; // 6 hours

      // Initialize flight if not exists
      if (!mockFlights.has(flightNumber)) {
        mockFlights.set(flightNumber, {
          startTime: Date.now(),
          durationMs: TOTAL_DURATION_MS,
        });
      }

      const flight = mockFlights.get(flightNumber)!;
      const elapsed = Date.now() - flight.startTime;

      // Progress from 0 → 1
      const progress = Math.min(elapsed / flight.durationMs, 1);

      // Linear interpolation
      const latitude = ORIGIN.lat + (DESTINATION.lat - ORIGIN.lat) * progress;
      const longitude = ORIGIN.lng + (DESTINATION.lng - ORIGIN.lng) * progress;

      const altitude =
        progress < 0.95
          ? 35000
          : Math.max(0, 35000 * (1 - (progress - 0.95) / 0.05));

          if(progress >= 1) {
            
          }

      return {
        latitude,
        longitude,
        altitude: Math.round(altitude),
        speed: 820,
        status: progress >= 1 ? 'landed' : 'active',
      };
    } else {
      try {
        const response: AxiosResponse<AviationstackResponse> = await axios.get(
          `${process.env.FLIGHT_API_BASE_URL}/flights`,
          {
            params: {
              access_key: process.env.FLIGHT_API_KEY,
              flight_data: flightNumber,
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
