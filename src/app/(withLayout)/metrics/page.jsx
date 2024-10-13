"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { toast } from "react-hot-toast";

const AddMetricForm = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate inputs
    if (!name || !value || !type) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    // Post data to Supabase
    const { data, error } = await supabase.from("metrics").insert([{ name, value: parseFloat(value), type }]);

    if (error) {
      console.error("Error adding metric:", error);
      setError(error.message);
      toast.error(`Error: ${error.message}`);
      setLoading(false);
      return;
    }

    // Reset form, show success toast, and notify parent to refetch data
    setName("");
    setValue("");
    setType("");
    setLoading(false);
    toast.success("Metric added successfully!");
    // onMetricAdded(); // Call parent callback to refetch metrics
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-md lg:w-1/2 mx-auto my-10 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Add New Metric</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Metric Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 py-1.5 px-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-200"
            required
            placeholder="Page Views"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Metric Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 py-1.5 px-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-200"
            required
            placeholder="1500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Metric Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 py-1.5 px-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-200"
            required
            placeholder="traffic"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 dark:bg-gray-300 text-white dark:text-black py-2 px-4 rounded-md shadow-md hover:bg-blue-600 dark:hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Metric"}
        </button>
      </form>
    </div>
  );
};

export default AddMetricForm;