// src/types/worker-analysis.ts
export interface AlgorithmPerformanceData {
  month: string;
  accuracyRate: number;
  responseTime: number;
}

export interface TestResult {
  id: string;
  workerId: string;
  testId: string;
  score: number;
  feedback: string | null;
  eligibilityStatus: string;
  createdAt: string;
  formattedDate: string;
}

export interface TesterAnalysisData {
  workerId: string;
  testerName: string;
  averageScore: number;
  accuracy: number;
  isEligible: boolean | null;
}

export interface IterationMetric {
  iteration: string;
  workers: number;
  tasks: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface DashboardSummary {
  iterationMetrics: IterationMetric[];
  workerEligibility: ChartDataPoint[];
  taskValidation: ChartDataPoint[];
  accuracyDistribution: ChartDataPoint[];
}
