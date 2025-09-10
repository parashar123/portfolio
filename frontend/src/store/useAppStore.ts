import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AppState, RealTimeMetrics, ModelPerformance, MicroserviceMetrics, CodeAnalysis, ConsultingProject } from '../types'

interface AppStore extends AppState {
  // Actions
  setActiveSection: (section: string) => void
  setLoading: (loading: boolean) => void
  addError: (error: Error) => void
  clearErrors: () => void
  
  // MLOps actions
  updateMLOpsMetrics: (metrics: RealTimeMetrics) => void
  updateModelPerformance: (models: ModelPerformance[]) => void
  
  // Architecture actions
  updateMicroserviceMetrics: (services: MicroserviceMetrics[]) => void
  
  // CodePitamah actions
  updateCodeAnalysis: (analysis: CodeAnalysis) => void
  
  // Consulting actions
  updateConsultingProjects: (projects: ConsultingProject[]) => void
}

const initialState: AppState = {
  mlops: {
    metrics: {
      throughput: 0,
      accuracy: 0,
      latency: 0,
      costSavings: 0,
      timestamp: new Date().toISOString()
    },
    models: [],
    experiments: []
  },
  architecture: {
    services: [],
    global: [],
    costs: []
  },
  codepitamah: {
    analysis: {
      language: 'python',
      complexity: 0,
      maintainability: 0,
      testCoverage: 0,
      securityScore: 0,
      performanceScore: 0,
      patterns: [],
      issues: [],
      suggestions: [],
      metrics: {
        linesOfCode: 0,
        cyclomaticComplexity: 0,
        maintainabilityIndex: 0,
        functionCount: 0,
        classCount: 0,
        commentRatio: 0
      }
    },
    suggestions: [],
    patterns: []
  },
  consulting: {
    projects: [],
    impact: [],
    testimonials: []
  },
  ui: {
    activeSection: 'home',
    isLoading: false,
    errors: []
  }
}

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      // UI Actions
      setActiveSection: (section: string) =>
        set((state) => ({
          ui: { ...state.ui, activeSection: section }
        })),
      
      setLoading: (loading: boolean) =>
        set((state) => ({
          ui: { ...state.ui, isLoading: loading }
        })),
      
      addError: (error: Error) =>
        set((state) => ({
          ui: {
            ...state.ui,
            errors: [...state.ui.errors, error]
          }
        })),
      
      clearErrors: () =>
        set((state) => ({
          ui: { ...state.ui, errors: [] }
        })),
      
      // MLOps Actions
      updateMLOpsMetrics: (metrics: RealTimeMetrics) =>
        set((state) => ({
          mlops: { ...state.mlops, metrics }
        })),
      
      updateModelPerformance: (models: ModelPerformance[]) =>
        set((state) => ({
          mlops: { ...state.mlops, models }
        })),
      
      // Architecture Actions
      updateMicroserviceMetrics: (services: MicroserviceMetrics[]) =>
        set((state) => ({
          architecture: { ...state.architecture, services }
        })),
      
      // CodePitamah Actions
      updateCodeAnalysis: (analysis: CodeAnalysis) =>
        set((state) => ({
          codepitamah: { ...state.codepitamah, analysis }
        })),
      
      // Consulting Actions
      updateConsultingProjects: (projects: ConsultingProject[]) =>
        set((state) => ({
          consulting: { ...state.consulting, projects }
        }))
    }),
    {
      name: 'suraj-portfolio-store'
    }
  )
)
