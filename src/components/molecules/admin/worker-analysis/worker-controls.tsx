// src/components/molecules/admin/worker-analysis/worker-controls.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { TRIGGER_ELIGIBILITY_UPDATE } from "@/graphql/mutations/mx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, RefreshCw } from "lucide-react";

interface WorkerAnalysisControlsProps {
  // Add refreshAllData prop to be called after eligibility update
  refreshAllData: () => void;
}

export default function WorkerAnalysisControls({
  refreshAllData,
}: WorkerAnalysisControlsProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const [triggerEligibilityUpdate, { loading }] = useMutation(
    TRIGGER_ELIGIBILITY_UPDATE,
    {
      onCompleted: () => {
        setMessage("Eligibility updates triggered successfully");
        setMessageType("success");

        // Call refreshAllData to refresh the data
        refreshAllData();

        // Clear message after 5 seconds
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
      },
      onError: (error) => {
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
    try {
      await triggerEligibilityUpdate();
    } catch (error) {
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
    }
  };

  return (
    <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
      <h3 className="text-lg font-semibold mb-2">Manual Controls</h3>

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
          ) : null}
          <AlertTitle>
            {messageType === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="flex space-x-4">
        <Button
          onClick={handleTriggerUpdate}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Updating..." : "Update Worker Eligibility"}
        </Button>

        <div className="text-sm text-gray-300 flex items-center">
          <p>Manually trigger eligibility recalculation for all workers</p>
        </div>
      </div>
    </div>
  );
}
