import { randomBytes } from 'crypto';

interface GenerateTrackingIdParams {
  flightNumber: string; // e.g. 998B
}

export function generateTrackingId({
  flightNumber,
}: GenerateTrackingIdParams): string {
  const randomPart = randomBytes(3).toString('hex').toUpperCase();
  // 6 chars: A1B2C3

  return `DYCARGO-${flightNumber}-${randomPart}`;
}
