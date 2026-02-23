import type { ExtractedData } from "../types";

interface ApplicationFormProps {
  formData: ExtractedData;
  isProcessing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ApplicationForm({
  formData,
  isProcessing,
  onChange,
  onSubmit,
}: ApplicationFormProps) {
  const isValid = Object.values(formData).every((val) => val.trim() !== "");

  return (
    <form className="mt-8 space-y-5" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={onChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
            placeholder="e.g. Building House"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={onChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
            placeholder="e.g. John Doe"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={onChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
            placeholder="e.g. johndoe@gmail.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Full Address <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={onChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
            placeholder="e.g. Burlington Colorado, Unite State"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            required
            value={formData.phone_number}
            onChange={onChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
            placeholder="e.g. 123412311"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isValid || isProcessing}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
}
