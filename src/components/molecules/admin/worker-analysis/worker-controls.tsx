// src/components/molecules/admin/worker-analysis/worker-controls.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { TRIGGER_ELIGIBILITY_UPDATE } from "@/graphql/mutations/mx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, RefreshCw, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

interface WorkerAnalysisControlsProps {
  refreshAllData: () => void; // Function to refresh all data in parent component
  thresholdValue?: number; // Current threshold value
  thresholdType?: string; // Current threshold type
}

export default function WorkerAnalysisControls({
  refreshAllData,
  thresholdValue = 0.7,
  thresholdType = "median",
}: WorkerAnalysisControlsProps) {
  const { accessToken } = useAuthStore();
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const [triggerEligibilityUpdate, { loading }] = useMutation(
    TRIGGER_ELIGIBILITY_UPDATE,
    {
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      onCompleted: (data) => {
        setIsUpdating(false);
        if (data.triggerEligibilityUpdate) {
          setMessage("Worker eligibility updates completed successfully");
          setMessageType("success");
        } else {
          setMessage("Eligibility update process encountered an issue");
          setMessageType("error");
        }

        // Call refreshAllData to refresh the data in parent component
        refreshAllData();

        // Clear message after 5 seconds
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
      },
      onError: (error) => {
        setIsUpdating(false);
        setMessage(
          `Error: ${
            error instanceof Error ? error.message : "An unknown error occurred"
          }`
        );
        setMessageType("error");

        // Clear message after 5 seconds
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
      },
    }
  );

  const handleTriggerUpdate = async () => {
    if (isUpdating) return; // Prevent multiple triggers

    try {
      setIsUpdating(true);

      // First try to update eligibility
      const result = await triggerEligibilityUpdate();

      if (result?.data?.triggerEligibilityUpdate) {
        // Show success message
        setMessage("Worker eligibility updates completed successfully");
        setMessageType("success");

        // Now refresh all data to show updated values
        await refreshAllData();
      } else {
        throw new Error("Update operation failed");
      }
    } catch (error) {
      console.error("Error triggering eligibility update:", error);
      setMessage(
        `Error: ${
          error instanceof Error ? error.message : "An unknown error occurred"
        }`
      );
      setMessageType("error");
    } finally {
      setIsUpdating(false);

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  // Format the threshold value for display
  const formattedThreshold = `${(thresholdValue * 100).toFixed(1)}%`;

  return (
    <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
      <h3 className="text-lg font-semibold mb-2">
        Worker Eligibility Controls
      </h3>

      {message && messageType && (
        <Alert
          className={`mb-4 ${
            messageType === "success"
              ? "bg-green-500/20 text-green-300 border-green-500"
              : "bg-red-500/20 text-red-300 border-red-500"
          }`}
        >
          {messageType === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {messageType === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="bg-blue-900/30 p-3 rounded-lg text-sm">
          <p className="text-blue-300 flex items-center mb-1">
            <span className="mr-2">•</span>
            <strong>Current threshold:</strong> {formattedThreshold} (
            {thresholdType})
          </p>
          <p className="text-blue-200 text-xs ml-6">
            Workers with accuracy above this threshold are marked as eligible
          </p>
        </div>

        <Button
          onClick={handleTriggerUpdate}
          disabled={loading || isUpdating}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${loading || isUpdating ? "animate-spin" : ""}`}
          />
          {loading || isUpdating ? "Updating..." : "Update Worker Eligibility"}
        </Button>
      </div>

      <div className="mt-4 p-3 bg-blue-900/20 rounded-lg text-xs text-blue-300">
        <p>
          <strong>How it works:</strong> The system compares each worker&apos;s
          average accuracy against the threshold value of {formattedThreshold}.
          Workers with accuracy above the threshold are marked eligible. This
          process ensures consistency between test results and eligibility
          status.
        </p>
      </div>
    </div>
  );
}
