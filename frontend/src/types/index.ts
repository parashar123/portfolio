// Core application types
export interface AppState {
  mlops: {
    metrics: RealTimeMetrics
    models: ModelPerformance[]
    experiments: Experiment[]
  }
  architecture: {
    services: MicroserviceMetrics[]
    global: GlobalPerformance[]
    costs: CostData[]
  }
  codepitamah: {
    analysis: CodeAnalysis
    suggestions: ArchitectureSuggestion[]
    patterns: Pattern[]
  }
  consulting: {
    projects: ConsultingProject[]
    impact: BusinessImpact[]
    testimonials: Testimonial[]
  }
  ui: {
    activeSection: string
    isLoading: boolean
    errors: Error[]
  }
}

// MLOps Types
export interface RealTimeMetrics {
  throughput: number // predictions/second
  accuracy: number // model accuracy %
  latency: number // response time ms
  costSavings: number // quarterly savings $
  timestamp: string
}

export interface ModelPerformance {
  id: string
  name: string
  algorithm: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  lastUpdated: string
  status: 'active' | 'training' | 'retired'
}

export interface Experiment {
  id: string
  name: string
  status: 'running' | 'completed' | 'failed'
  metrics: Record<string, number>
  startTime: string
  endTime?: string
}

export interface FeatureImportance {
  feature: string
  importance: number
  drift: number
}

export interface DriftScore {
  feature: string
  score: number
  threshold: number
  status: 'normal' | 'warning' | 'critical'
}

// Architecture Types
export interface MicroserviceMetrics {
  id: string
  name: string
  status: 'healthy' | 'degraded' | 'down'
  latency: number
  throughput: number
  errorRate: number
  cpuUsage: number
  memoryUsage: number
  lastUpdated: string
}

export interface GlobalPerformance {
  region: string
  latency: number
  uptime: number
  users: number
  revenue: number
  timestamp: string
}

export interface CostData {
  service: string
  cost: number
  savings: number
  trend: 'up' | 'down' | 'stable'
  timestamp: string
}

// CodePitamah Types
export interface CodeAnalysis {
  language: string
  complexity: number
  maintainability: number
  testCoverage: number
  securityScore: number
  performanceScore: number
  patterns: Pattern[]
  issues: CodeIssue[]
  suggestions: string[]
  metrics: CodeMetrics
}

export interface CodeMetrics {
  linesOfCode: number
  cyclomaticComplexity: number
  maintainabilityIndex: number
  functionCount: number
  classCount: number
  commentRatio: number
}

export interface Pattern {
  id: string
  name: string
  type: 'architectural' | 'design' | 'anti-pattern'
  confidence: number
  description: string
  recommendation?: string
}

export interface CodeIssue {
  id: string
  type: 'error' | 'warning' | 'info' | 'bug' | 'vulnerability' | 'performance' | 'maintainability'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  line: number
  column: number
  rule_id?: string
}

export interface ArchitectureSuggestion {
  id: string
  type: 'refactor' | 'optimize' | 'security' | 'scalability'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  confidence: number
}

// Consulting Types
export interface ConsultingProject {
  id: string
  name: string
  client: string
  description: string
  technologies: string[]
  duration: string
  value: number
  teamSize: number
  status: 'completed' | 'in_progress' | 'planning'
}

export interface BusinessImpact {
  id: string
  metric: string
  before: number
  after: number
  improvement: number
  unit: string
  description: string
}

// Consulting Dashboard Types
export interface ConsultingDashboard {
  projects: ConsultingProject[]
  impact: ConsultingImpact
  testimonials: Testimonial[]
}

export interface ConsultingStats {
  totalContractValue: number
  teamSize: number
  clientSatisfaction: number
  projectsCompleted: number
}

export interface ConsultingImpact {
  performanceImprovements: PerformanceImprovement[]
  costSavings: CostSaving[]
}

export interface PerformanceImprovement {
  metric: string
  improvement: number
}

export interface CostSaving {
  area: string
  amount: number
  percentage: number
}

export interface Testimonial {
  id: string
  client: string
  position: string
  quote: string
  rating: number
  date: string
}

// UI Types
export interface NavigationItem {
  id: string
  label: string
  path: string
  icon: string
  description: string
  badge?: string
  highlight?: boolean
}

export interface ChartData {
  name: string
  value: number
  timestamp?: string
  [key: string]: any
}

export interface MetricCard {
  title: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: string
  color: string
}

// API Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: string
}

export interface WebSocketMessage {
  type: string
  data: any
  timestamp: string
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  company: string
  message: string
  type: 'consulting' | 'collaboration' | 'hiring' | 'other'
}

// Animation Types
export interface AnimationVariants {
  hidden: any
  visible: any
  exit?: any
}
