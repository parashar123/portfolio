const API_BASE_URL = 'https://portfolio-production-6f20.up.railway.app/api'

export interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp: string
  message?: string
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // MLOps API
  async getMLOpsMetrics() {
    return this.request('/mlops/metrics')
  }

  async getMLOpsModels() {
    return this.request('/mlops/models')
  }

  async getMLOpsDrift() {
    return this.request('/mlops/drift')
  }

  async getMLOpsExperiments() {
    return this.request('/mlops/experiments')
  }

  async getMLOpsDashboard() {
    return this.request('/mlops/dashboard')
  }

  async triggerRetraining() {
    return this.request('/mlops/retrain', { method: 'POST' })
  }

  // Architecture API
  async getArchitectureServices() {
    return this.request('/architecture/services')
  }

  async getArchitectureGlobal() {
    return this.request('/architecture/global')
  }

  async getArchitectureLeadership() {
    return this.request('/architecture/leadership')
  }

  async getArchitectureDashboard() {
    return this.request('/architecture/dashboard')
  }

  async triggerAutoScaling(serviceId: string) {
    return this.request(`/architecture/scale/${serviceId}`, { method: 'POST' })
  }

  // Cost Optimization API
  async getCostOptimizationOverview() {
    return this.request('/optimization/overview')
  }

  async getCostOptimizationAwsAnalytics() {
    return this.request('/optimization/aws-analytics')
  }

  async getCostOptimizationROI() {
    return this.request('/optimization/roi')
  }

  async getCostOptimizationRecommendations() {
    return this.request('/optimization/recommendations')
  }

  async getCostOptimizationDashboard() {
    return this.request('/optimization/dashboard')
  }

  async simulateOptimization(optimizationType: string, parameters: any) {
    return this.request('/optimization/simulate', {
      method: 'POST',
      body: JSON.stringify({ optimization_type: optimizationType, ...parameters }),
    })
  }

  // CodePitamah API
  async analyzeCode(code: string, language: string = 'python') {
    return this.request('/codepitamah/analyze', {
      method: 'POST',
      body: JSON.stringify({ code, language }),
    })
  }

  async getCodePitamahSuggestions() {
    return this.request('/codepitamah/suggestions')
  }

  async getCodePitamahPerformance() {
    return this.request('/codepitamah/performance')
  }

  async generateArchitecture(requirements: any) {
    return this.request('/codepitamah/generate-architecture', {
      method: 'POST',
      body: JSON.stringify(requirements),
    })
  }

  async getCodePitamahDashboard() {
    return this.request('/codepitamah/dashboard')
  }

  async chatWithAssistant(message: string, context?: any) {
    return this.request('/codepitamah/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    })
  }

  // Consulting API
  async getConsultingProjects() {
    return this.request('/consulting/projects')
  }

  async getConsultingImpact() {
    return this.request('/consulting/impact')
  }

  async getConsultingTestimonials() {
    return this.request('/consulting/testimonials')
  }

  async getConsultingDashboard() {
    return this.request('/consulting/dashboard')
  }

  async getConsultingStats() {
    return this.request('/consulting/stats')
  }

  // Health check
  async getHealth() {
    return this.request('/health')
  }
}

export const apiService = new ApiService()
