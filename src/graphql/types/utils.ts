export enum ThresholdType {
  MEDIAN = "median",
  MEAN = "mean",
  CUSTOM = "custom",
}

export interface ThresholdSettings {
  thresholdType: ThresholdType;
  thresholdValue: number;
  lastUpdated: Date;
}

export interface ThresholdSettingsInput {
  thresholdType: ThresholdType;
  thresholdValue?: number;
}
