"use client";
import { useState, useEffect } from "react";
import withAuth from "@/lib/withAuth";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMetric, setEditingMetric] = useState(null);
  const [newValue, setNewValue] = useState("");

  // Fetch metrics from Supabase
  const fetchMetrics = async () => {
    const { data, error } = await supabase.from("metrics").select("*");
    if (error) {
      console.error("Error fetching metrics:", error);
      setLoading(false);
      return;
    }
    setMetrics(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("metrics").delete().eq("id", id);
    if (error) {
      console.error("Error deleting metric:", error);
      return;
    }
    fetchMetrics();
  };

  const handleEdit = (metric) => {
    setEditingMetric(metric.id);
    setNewValue(metric.value);
  };

  const handleUpdate = async (id) => {
    const { error } = await supabase
      .from("metrics")
      .update({ value: newValue })
      .eq("id", id);
    if (error) {
      console.error("Error updating metric:", error);
      return;
    }
    setEditingMetric(null);
    fetchMetrics();
  };

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["Name", "Value", "Type"];
    csvRows.push(headers.join(","));

    metrics.forEach((metric) => {
      const values = [metric.name, metric.value, metric.type];
      csvRows.push(values.join(","));
    });

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "metrics.csv");
    a.click();
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  const lineChartData = metrics.map((metric) => ({
    name: metric.name,
    uv: metric.value,
  }));
  const barChartData = metrics.map((metric) => ({
    name: metric.name,
    pv: metric.value,
  }));
  const pieChartData = metrics.map((metric) => ({
    name: metric.name,
    amt: metric.value,
  }));

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Metrics Dashboard
      </h1>
      {/* Export Button */}
      <button
        onClick={exportToCSV}
        className="mb-4 bg-gray-600 dark:bg-gray-300 text-white dark:text-black py-2 px-4 rounded-md shadow-md hover:bg-blue-600 dark:hover:bg-blue-700"
      >
        Export to CSV
      </button>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Line Chart
          </h2>
          <LineChart width={300} height={200} data={lineChartData}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Bar Chart
          </h2>
          <BarChart width={300} height={200} data={barChartData}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Bar dataKey="pv" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Pie Chart
          </h2>
          <PieChart width={300} height={200}>
            <Pie
              data={pieChartData}
              dataKey="amt"
              cx="50%"
              cy="50%"
              outerRadius={60}
            >
              <Cell fill="#8884d8" />
            </Pie>
          </PieChart>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="py-3 px-6 border-b-2 border-gray-300 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="py-3 px-6 border-b-2 border-gray-300 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">
                Value
              </th>
              <th className="py-3 px-6 border-b-2 border-gray-300 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">
                Type
              </th>
              <th className="py-3 px-6 border-b-2 border-gray-300 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr
                key={metric.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-6 border-b border-gray-200 dark:border-gray-600">
                  {metric.name}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 dark:border-gray-600">
                  {editingMetric === metric.id ? (
                    <input
                      type="number"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="border rounded px-3 py-1 w-full dark:bg-gray-700 dark:text-gray-200"
                    />
                  ) : (
                    metric.value
                  )}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 dark:border-gray-600">
                  {metric.type}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 dark:border-gray-600">
                  {editingMetric === metric.id ? (
                    <button
                      className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                      onClick={() => handleUpdate(metric.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      onClick={() => handleEdit(metric)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 ml-4"
                    onClick={() => handleDelete(metric.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
