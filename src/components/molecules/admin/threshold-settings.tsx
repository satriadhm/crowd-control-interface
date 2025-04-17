"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_THRESHOLD_SETTINGS } from "@/graphql/queries/utils";
import { UPDATE_THRESHOLD_SETTINGS } from "@/graphql/mutations/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThresholdType } from "@/graphql/types/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function ThresholdConfiguration() {
  const [thresholdType, setThresholdType] = useState<ThresholdType>(
    ThresholdType.MEDIAN
  );
  const [thresholdValue, setThresholdValue] = useState<number>(0.7);
  const [customValueEnabled, setCustomValueEnabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Query current threshold settings
  const { data, loading, error, refetch } = useQuery(GET_THRESHOLD_SETTINGS, {
    fetchPolicy: "network-only",
  });

  // Update threshold settings mutation
  const [updateThresholdSettings, { loading: updating }] = useMutation(
    UPDATE_THRESHOLD_SETTINGS,
    {
      onCompleted: () => {
        setSuccessMessage("Threshold settings updated successfully");
        setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      },
      onError: (error) => {
        setErrorMessage(`Error updating threshold settings: ${error.message}`);
        setTimeout(() => setErrorMessage(""), 5000); // Clear message after 5 seconds
      },
    }
  );

  // Load current settings when data is available
  useEffect(() => {
    if (data?.getThresholdSettings) {
      const settings = data.getThresholdSettings;
      setThresholdType(settings.thresholdType as ThresholdType);
      setThresholdValue(settings.thresholdValue);
      setCustomValueEnabled(settings.thresholdType === ThresholdType.CUSTOM);
    }
  }, [data]);

  // Handle threshold type change
  const handleThresholdTypeChange = (value: string) => {
    const newType = value as ThresholdType;
    setThresholdType(newType);
    setCustomValueEnabled(newType === ThresholdType.CUSTOM);
  };

  // Handle threshold value change
  const handleThresholdValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 1) {
      setThresholdValue(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const input = {
        thresholdType,
        ...(thresholdType === ThresholdType.CUSTOM && { thresholdValue }),
      };

      await updateThresholdSettings({
        variables: { input },
      });

      refetch(); // Refresh data after update
    } catch (err) {
      console.error("Error updating threshold settings:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load threshold settings: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="bg-white/10 border-0 text-white">
      <CardHeader>
        <CardTitle>Worker Eligibility Threshold Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        {successMessage && (
          <Alert className="mb-4 bg-green-500/20 text-green-300 border-green-500">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Threshold Calculation Method
            </label>
            <Select
              value={thresholdType}
              onValueChange={handleThresholdTypeChange}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select threshold type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/20 text-white">
                <SelectItem
                  value={ThresholdType.MEDIAN}
                  className="hover:bg-white/10"
                >
                  Median (Middle value of all worker accuracies)
                </SelectItem>
                <SelectItem
                  value={ThresholdType.MEAN}
                  className="hover:bg-white/10"
                >
                  Mean (Average of all worker accuracies)
                </SelectItem>
                <SelectItem
                  value={ThresholdType.CUSTOM}
                  className="hover:bg-white/10"
                >
                  Custom (Set a specific value)
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-400">
              This method determines how the eligibility threshold is
              calculated.
            </p>
          </div>

          {customValueEnabled && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Custom Threshold Value (0-1)
              </label>
              <Input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={thresholdValue}
                onChange={handleThresholdValueChange}
                className="bg-white/10 border-white/20 text-white"
              />
              <p className="text-xs text-gray-400">
                Workers with accuracy above this value will be marked as
                eligible. Example: 0.7 means 70% accuracy threshold.
              </p>
            </div>
          )}

          {!customValueEnabled && (
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium mb-2">
                {thresholdType === ThresholdType.MEDIAN
                  ? "Median Calculation"
                  : "Mean Calculation"}
              </h4>
              <p className="text-sm text-gray-300">
                {thresholdType === ThresholdType.MEDIAN
                  ? "The system will calculate the median accuracy value from all workers. Workers with accuracy above this median will be considered eligible."
                  : "The system will calculate the average (mean) accuracy value from all workers. Workers with accuracy above this average will be considered eligible."}
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Current default value: {thresholdValue.toFixed(2)} (
                {(thresholdValue * 100).toFixed(0)}%)
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-tertiary to-tertiary-light text-white"
            disabled={updating}
          >
            {updating ? "Updating..." : "Save Configuration"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
