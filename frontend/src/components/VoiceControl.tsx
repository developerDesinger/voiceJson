import { Mic, MicOff } from "lucide-react";

interface VoiceControlProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}

export function VoiceControl({
  isListening,
  onStartListening,
  onStopListening,
}: VoiceControlProps) {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={isListening ? onStopListening : onStartListening}
        className={`relative flex items-center justify-center p-4 rounded-full text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          isListening
            ? "bg-red-500 hover:bg-red-600 animate-pulse"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
        title={isListening ? "Stop Listening" : "Start Voice Input"}
      >
        {isListening ? (
          <MicOff className="w-8 h-8" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
        {isListening && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        )}
      </button>
    </div>
  );
}
