'use client'
import { useEffect, useState } from "react"
import { getSocket } from "@/lib/websocket"

type ShipmentUpdate = {
  batchId: string
  lat: number
  lng: number
  status: string
}

export function useLiveShipment(batchId: string) {
  const [position, setPosition] = useState<ShipmentUpdate | null>(null)

  useEffect(() => {
    const socket = getSocket()

    socket.emit("join:batch", { batchId })

    socket.on("shipment:update", (data: ShipmentUpdate) => {
      if (data.batchId === batchId) {
        setPosition(data)
      }
    })

    return () => {
      socket.off("shipment:update")
    }
  }, [batchId])

  return position
}
