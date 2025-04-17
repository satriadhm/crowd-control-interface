// src/hooks/useRefreshSync.ts
import { useState, useCallback } from "react";

/**
 * A custom hook for managing synchronized refresh state across multiple components
 * Handles loading states and coordination between components
 */
interface UseRefreshSyncReturn {
  isRefreshing: boolean;
  startRefresh: () => void;
  endRefresh: () => void;
  handleRefresh: (refreshFunction: () => Promise<unknown> | void) => Promise<void>;
}

export function useRefreshSync(
  refreshDuration: number = 1000 // Default animation duration in ms
): UseRefreshSyncReturn {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Start refresh animation
  const startRefresh = useCallback(() => {
    setIsRefreshing(true);
  }, []);

  // End refresh animation
  const endRefresh = useCallback(() => {
    setIsRefreshing(false);
  }, []);

  // Handle refresh with animation
  const handleRefresh = useCallback(
    async (refreshFunction: () => Promise<unknown> | void) => {
      if (isRefreshing) return; // Prevent multiple simultaneous refreshes

      try {
        startRefresh();

        // Execute the refresh function (may be async)
        await refreshFunction();

        // Ensure the refresh animation shows for at least the specified duration
        setTimeout(() => {
          endRefresh();
        }, refreshDuration);
      } catch (error) {
        console.error("Error during refresh:", error);
        endRefresh();
      }
    },
    [isRefreshing, startRefresh, endRefresh, refreshDuration]
  );

  return {
    isRefreshing,
    startRefresh,
    endRefresh,
    handleRefresh,
  };
}
