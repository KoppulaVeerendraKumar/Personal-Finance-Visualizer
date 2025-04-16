import { useState } from "react";
import axios from "axios";
import { BASE_API } from "../utils/api"; // Import BASE_API from api.js

const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment"];

export default function BudgetForm() {
  const [category, setCategory] = useState(categories[0]);
  const [budget, setBudget] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(false);  // Track loading state
  const [error, setError] = useState("");        // Track error state
  const [success, setSuccess] = useState("");    // Track success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate budget input
    if (isNaN(budget) || budget <= 0) {
      setError("Please enter a valid budget amount.");
      return;
    }

    setLoading(true);  // Set loading state when form is submitted
    setError("");      // Reset previous error messages
    setSuccess("");    // Reset success message

    const requestData = {
      category,
      budget,
      month,
    };

    // Log the data being sent to the API
    console.log(`Sending to ${BASE_API}/api/budget/${month}`, requestData);

    try {
      // Send POST request to the backend API to set the budget
      const response = await axios.post(`${BASE_API}/api/budget/${month}`, requestData);

      // Log the response from the server
      console.log("Response from server:", response);

      setSuccess("Budget set successfully! 🎉");  // Set success message
      setBudget("");  // Reset budget input field after submission

      // Automatically clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      console.error("Error occurred while setting budget:", err);
      setError("There was an error with your request. Please try again."); // Display error message
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-lg space-y-4"
    >
      <h3 className="text-xl font-semibold text-purple-700">Set Monthly Budget</h3>

      {/* Display success or error message */}
      {success && <div className="text-green-500">{success}</div>}
      {error && <div className="text-red-500">{error}</div>}

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Budget Amount"
        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        type="submit"
        className="bg-purple-600 text-white p-3 w-full rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <span className="animate-spin">&#x21bb;</span> // Simple spinner
        ) : (
          "💸 Set Budget"
        )}
      </button>
    </form>
  );
}
