"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique IDs

const Admin = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>(""); // Track selected option
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const correctPassword = "Glamour@900"; // Replace with your actual password logic

    if (password === correctPassword) {
      const uniqueId = uuidv4(); // Generate a unique ID
      const expirationTime = Date.now() + 3600000; // Set expiration time to 1 hour (in milliseconds)

      // Save session ID and expiration time to localStorage
      localStorage.setItem(
        "adminSession",
        JSON.stringify({ id: uniqueId, expiresAt: expirationTime })
      );

      if (selectedOption === "query") {
        router.push("/admin/query"); // Redirect to query page
        setIsLoading(false);
      } else if (selectedOption === "portal") {
        setIsLoading(false);
        router.push("/admin/portal"); // Redirect to portal page
      } else {
        setIsLoading(false);
        setError("Please select an option before logging in.");
      }
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div className="w-full h-[100dvh] flex justify-center items-center">
      <div className="w-1/4 flex flex-col gap-5 p-5 bg-slate-50 border-[#cdb4db] border-[2px] rounded-md">
        <div className="text-center flex flex-col gap-2.5">
          <h1 className="text-2xl font-semibold text-[#cdb4db]">
            Glamour Avenue
          </h1>
          <h1 className="text-xl font-semibold">Welcome Admin!!</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-[#cdb4db]">
              Password:
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full outline-none px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-[#cdb4db]">
              Choose an option:
            </label>
            <div className="flex justify-start items-center gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="query"
                  name="adminOption"
                  value="query"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="h-4 w-4 text-[#cdb4db] border-gray-300 focus:ring-[#cdb4db]"
                />
                <label
                  htmlFor="query"
                  className="text-sm font-medium text-gray-700"
                >
                  User Query
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="portal"
                  name="adminOption"
                  value="portal"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="h-4 w-4 text-[#cdb4db] border-gray-300 focus:ring-[#cdb4db]"
                />
                <label
                  htmlFor="portal"
                  className="text-sm font-medium text-gray-700"
                >
                  Portal
                </label>
              </div>
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-[#838083] text-white rounded-md"
            >
              Home
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#cdb4db] text-white rounded-md"
            >
              {isLoading ? "Login..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
