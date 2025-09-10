import { useState, useEffect, useCallback } from 'react'
import { apiService, ApiResponse } from '../services/api'

export interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      setData(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}

// Specific hooks for each API section
export function useMLOpsMetrics() {
  return useApi(() => apiService.getMLOpsMetrics())
}

export function useMLOpsModels() {
  return useApi(() => apiService.getMLOpsModels())
}

export function useMLOpsDrift() {
  return useApi(() => apiService.getMLOpsDrift())
}

export function useMLOpsDashboard() {
  return useApi(() => apiService.getMLOpsDashboard())
}

export function useArchitectureServices() {
  return useApi(() => apiService.getArchitectureServices())
}

export function useArchitectureGlobal() {
  return useApi(() => apiService.getArchitectureGlobal())
}

export function useArchitectureLeadership() {
  return useApi(() => apiService.getArchitectureLeadership())
}

export function useArchitectureDashboard() {
  return useApi(() => apiService.getArchitectureDashboard())
}

export function useCostOptimizationDashboard() {
  return useApi(() => apiService.getCostOptimizationDashboard())
}

export function useCodePitamahDashboard() {
  return useApi(() => apiService.getCodePitamahDashboard())
}

export function useConsultingDashboard() {
  return useApi(() => apiService.getConsultingDashboard())
}

export function useConsultingStats() {
  return useApi(() => apiService.getConsultingStats())
}
