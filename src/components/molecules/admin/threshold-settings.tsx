// src/components/molecules/admin/threshold-settings.tsx
"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_THRESHOLD_SETTINGS } from "@/graphql/queries/utils";
import { UPDATE_THRESHOLD_SETTINGS } from "@/graphql/mutations/utils";
import { TRIGGER_ELIGIBILITY_UPDATE } from "@/graphql/mutations/mx";
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
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

interface ThresholdConfigurationProps {
  onThresholdUpdate?: () => void;
}

export default function ThresholdConfiguration({
  onThresholdUpdate,
}: ThresholdConfigurationProps) {
  const { accessToken } = useAuthStore();
  const [thresholdType, setThresholdType] = useState<ThresholdType>(
    ThresholdType.MEDIAN
  );
  const [thresholdValue, setThresholdValue] = useState<number>(0.7);
  const [customValueEnabled, setCustomValueEnabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Query current threshold settings
  const { data, loading, error, refetch } = useQuery(GET_THRESHOLD_SETTINGS, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
  });

  // Update threshold settings mutation
  const [updateThresholdSettings, { loading: updating }] = useMutation(
    UPDATE_THRESHOLD_SETTINGS,
    {
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      onCompleted: () => {
        setSuccessMessage("Threshold settings updated successfully");
        setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds

        // After updating threshold, trigger eligibility update
        triggerEligibilityUpdate();

        // Call parent callback if provided
        if (onThresholdUpdate) {
          onThresholdUpdate();
        }
      },
      onError: (error) => {
        setErrorMessage(`Error updating threshold settings: ${error.message}`);
        setTimeout(() => setErrorMessage(""), 5000); // Clear message after 5 seconds
      },
    }
  );

  // Trigger eligibility update mutation
  const [triggerEligibilityUpdate, { loading: updatingEligibility }] =
    useMutation(TRIGGER_ELIGIBILITY_UPDATE, {
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      onCompleted: () => {
        setIsUpdating(false);
        setSuccessMessage(
          (prev) => prev + " Worker eligibility updated successfully."
        );

        // Refresh data after updating
        refetch();

        // Call parent callback if provided
        if (onThresholdUpdate) {
          onThresholdUpdate();
        }
      },
      onError: (error) => {
        setIsUpdating(false);
        setErrorMessage(`Error updating worker eligibility: ${error.message}`);
      },
    });

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
    setIsUpdating(true);

    try {
      const input = {
        thresholdType,
        ...(thresholdType === ThresholdType.CUSTOM && { thresholdValue }),
      };

      await updateThresholdSettings({
        variables: { input },
      });
    } catch (err) {
      console.error("Error updating threshold settings:", err);
      setIsUpdating(false);
    }
  };

  // Handle manual trigger of eligibility update
  const handleManualUpdate = async () => {
    setIsUpdating(true);
    try {
      await triggerEligibilityUpdate();
    } catch (err) {
      console.error("Error triggering eligibility update:", err);
      setIsUpdating(false);
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

        <div className="mb-6 bg-blue-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Current Settings</h3>
          <div className="mt-2 space-y-1">
            <p>
              <span className="text-gray-300">Threshold Type:</span>{" "}
              <span className="font-semibold">
                {data?.getThresholdSettings?.thresholdType
                  ?.charAt(0)
                  .toUpperCase() +
                  data?.getThresholdSettings?.thresholdType?.slice(1) || "N/A"}
              </span>
            </p>
            <p>
              <span className="text-gray-300">Current Value:</span>{" "}
              <span className="font-semibold">
                {(data?.getThresholdSettings?.thresholdValue * 100).toFixed(2)}%
              </span>
            </p>
            <p className="text-sm text-gray-400">
              Last updated:{" "}
              {new Date(
                data?.getThresholdSettings?.lastUpdated
              ).toLocaleString()}
            </p>
          </div>
        </div>

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
                The exact threshold value will be calculated server-side based
                on worker data.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-tertiary to-tertiary-light text-white"
              disabled={updating || updatingEligibility || isUpdating}
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Configuration"
              )}
            </Button>

            <Button
              type="button"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              onClick={handleManualUpdate}
              disabled={updating || updatingEligibility || isUpdating}
            >
              {updatingEligibility ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Updating Worker Eligibility...
                </>
              ) : (
                "Manually Update Worker Eligibility"
              )}
            </Button>
          </div>

          <div className="text-sm text-gray-400 p-3 border border-gray-700 rounded-lg">
            <p>
              <strong>Note:</strong> Changing the threshold type or value will
              automatically update all worker eligibility statuses. This process
              may take a moment to complete.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
