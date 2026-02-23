import React, { useState } from "react";
import "./index.css";
import type { ExtractedData } from "./types";
import { VoiceControl } from "./components/VoiceControl";
import { StatusAlerts } from "./components/StatusAlerts";
import { ApplicationForm } from "./components/ApplicationForm";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";

function App() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<ExtractedData>({
    title: "",
    name: "",
    email: "",
    address: "",
    phone_number: "",
  });

  const onTranscriptComplete = (data: ExtractedData) => {
    setFormData((prev) => ({
      title: data.title || prev.title,
      name: data.name || prev.name,
      email: data.email || prev.email,
      address: data.address || prev.address,
      phone_number: data.phone_number || prev.phone_number,
    }));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  const {
    isListening,
    isProcessing,
    liveTranscript,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    onTranscriptComplete,
    onError: (msg: string) => setError(msg),
  });

  const handleStartListening = () => {
    setError(null);
    setSuccess(false);
    startListening();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        title: "",
        name: "",
        email: "",
        address: "",
        phone_number: "",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl ring-1 ring-gray-900/5">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Job Application
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Use voice to auto-fill or enter details manually.
          </p>
        </div>

        <VoiceControl
          isListening={isListening}
          onStartListening={handleStartListening}
          onStopListening={stopListening}
        />

        <StatusAlerts
          isProcessing={isProcessing}
          isListening={isListening}
          liveTranscript={liveTranscript}
          error={error}
          success={success}
        />

        <ApplicationForm
          formData={formData}
          isProcessing={isProcessing}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
