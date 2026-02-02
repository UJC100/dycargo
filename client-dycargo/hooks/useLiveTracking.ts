'use client'

import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getSocket } from '@/lib/websocket'

export type ShipmentUpdate = {
  batchId: string
  lat: number
  lng: number
  status: string
}

export function useLiveShipment(
  batchId: string | undefined,
  options?: { enabled?: boolean }
) {
  const queryClient = useQueryClient()

  const query = useQuery<ShipmentUpdate>({
  queryKey: ['live-shipment', batchId],
  queryFn: async () => {
    throw new Error('No initial fetch')
  },
  enabled: false, // socket-only
})

  // 2️⃣ WebSocket pushes updates INTO the cache
  useEffect(() => {
    if (!batchId) return

    const socket = getSocket()

    socket.emit('join:batch', { batchId })

    const handler = (data: ShipmentUpdate) => {
      if (data.batchId !== batchId) return

      queryClient.setQueryData(
        ['live-shipment', batchId],
        data
      )
    }

    socket.on('shipment:update', handler)

    return () => {
      socket.emit('leave:batch', { batchId })
      socket.off('shipment:update', handler)
    }
  }, [batchId, queryClient])

  return query
}
