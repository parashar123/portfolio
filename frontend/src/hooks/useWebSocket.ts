import { useEffect, useRef, useState } from 'react'
import { websocketService, WebSocketMessage, WebSocketEventHandler } from '../services/websocket'

export interface UseWebSocketOptions {
  autoConnect?: boolean
  channels?: string[]
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { autoConnect = true, channels = [] } = options
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const eventHandlers = useRef<Map<string, WebSocketEventHandler>>(new Map())

  useEffect(() => {
    if (autoConnect) {
      websocketService.connect().then(() => {
        setIsConnected(true)
      }).catch(error => {
        console.error('WebSocket connection failed:', error)
      })
    }

    return () => {
      websocketService.disconnect()
      setIsConnected(false)
    }
  }, [autoConnect])

  useEffect(() => {
    channels.forEach(channel => {
      websocketService.subscribe(channel)
    })

    return () => {
      channels.forEach(channel => {
        websocketService.unsubscribe(channel)
      })
    }
  }, [channels])

  const sendMessage = (message: any) => {
    websocketService.send(message)
  }

  const subscribe = (channel: string) => {
    websocketService.subscribe(channel)
  }

  const unsubscribe = (channel: string) => {
    websocketService.unsubscribe(channel)
  }

  const on = (eventType: string, handler: WebSocketEventHandler) => {
    eventHandlers.current.set(eventType, handler)
    websocketService.on(eventType, handler)
  }

  const off = (eventType: string, handler: WebSocketEventHandler) => {
    eventHandlers.current.delete(eventType)
    websocketService.off(eventType, handler)
  }

  // Listen for all messages to update lastMessage
  useEffect(() => {
    const handleMessage = (message: WebSocketMessage) => {
      setLastMessage(message)
    }

    websocketService.on('*', handleMessage)

    return () => {
      websocketService.off('*', handleMessage)
    }
  }, [])

  // Cleanup event handlers on unmount
  useEffect(() => {
    return () => {
      eventHandlers.current.forEach((handler, eventType) => {
        websocketService.off(eventType, handler)
      })
    }
  }, [])

  return {
    isConnected,
    lastMessage,
    sendMessage,
    subscribe,
    unsubscribe,
    on,
    off,
  }
}

// Specific hooks for different data types
export function useMLOpsRealTime() {
  const { isConnected, lastMessage, subscribe, unsubscribe } = useWebSocket({
    channels: ['mlops']
  })

  useEffect(() => {
    subscribe('mlops')
    return () => unsubscribe('mlops')
  }, [subscribe, unsubscribe])

  return {
    isConnected,
    mlopsData: lastMessage?.type === 'mlops_metrics' ? lastMessage.data : null,
  }
}

export function useArchitectureRealTime() {
  const { isConnected, lastMessage, subscribe, unsubscribe } = useWebSocket({
    channels: ['architecture']
  })

  useEffect(() => {
    subscribe('architecture')
    return () => unsubscribe('architecture')
  }, [subscribe, unsubscribe])

  return {
    isConnected,
    architectureData: lastMessage?.type === 'architecture_metrics' ? lastMessage.data : null,
  }
}

export function useCostOptimizationRealTime() {
  const { isConnected, lastMessage, subscribe, unsubscribe } = useWebSocket({
    channels: ['optimization']
  })

  useEffect(() => {
    subscribe('optimization')
    return () => unsubscribe('optimization')
  }, [subscribe, unsubscribe])

  return {
    isConnected,
    optimizationData: lastMessage?.type === 'cost_optimization' ? lastMessage.data : null,
  }
}

export function useCodePitamahRealTime() {
  const { isConnected, lastMessage, subscribe, unsubscribe } = useWebSocket({
    channels: ['codepitamah']
  })

  useEffect(() => {
    subscribe('codepitamah')
    return () => unsubscribe('codepitamah')
  }, [subscribe, unsubscribe])

  return {
    isConnected,
    codepitamahData: lastMessage?.type === 'codepitamah_analysis' ? lastMessage.data : null,
  }
}
