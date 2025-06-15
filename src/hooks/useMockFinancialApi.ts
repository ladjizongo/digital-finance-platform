
import mockFinancialApiResponse from "@/data/mockFinancialApiResponse";

/**
 * Hook to access mock financial API data as if from a real API.
 */
export function useMockFinancialApi() {
  // Could be extended for loading/error states if/when simulating real API
  return {
    data: mockFinancialApiResponse,
    isLoading: false,
    error: null
  };
}
