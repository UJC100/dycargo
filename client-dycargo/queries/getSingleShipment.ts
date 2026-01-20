import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export function useGetSingleShipment(trackingCode: string) {
  return useQuery({
    queryKey: ['shipment', trackingCode],
    queryFn: () =>
      api(`/shipments/${trackingCode}`),
    enabled: !!trackingCode,
  })
}
