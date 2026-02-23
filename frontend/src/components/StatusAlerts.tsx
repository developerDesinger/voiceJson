import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface StatusAlertsProps {
  isProcessing: boolean;
  isListening: boolean;
  liveTranscript: string;
  error: string | null;
  success: boolean;
}

export function StatusAlerts({
  isProcessing,
  isListening,
  liveTranscript,
  error,
  success,
}: StatusAlertsProps) {
  return (
    <>
      {/* Status Indicators */}
      <div className="text-center min-h-6 flex flex-col items-center">
        {isProcessing && (
          <div className="flex items-center justify-center text-indigo-600 font-medium space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing speech with AI...</span>
          </div>
        )}
        {isListening && !isProcessing && (
          <div className="text-red-500 font-medium animate-pulse">
            Listening to your voice...
          </div>
        )}
        {liveTranscript && (
          <div className="mt-4 p-3 bg-indigo-50 text-indigo-800 rounded-md shadow-inner italic text-sm w-full max-w-sm">
            "{liveTranscript}"
          </div>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 text-sm text-red-700 font-medium">{error}</div>
          </div>
        </div>
      )}

      {success && !error && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle2
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 text-sm text-green-700 font-medium">
              Data saved successfully!
            </div>
          </div>
        </div>
      )}
    </>
  );
}
