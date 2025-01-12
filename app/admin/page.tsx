"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique IDs

const page = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const correctPassword = "Glamouravenue@900"; // Replace with your actual password logic

    if (password === correctPassword) {
      const uniqueId = uuidv4(); // Generate a unique ID
      localStorage.setItem("adminSessionId", uniqueId); // Save unique ID to localStorage
      router.push("/admin/portal"); // Redirect to the upload page
    } else {
      setError("Invalid password. Please try again.");
    }
  };
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center">
      <div className="w-1/4 flex flex-col gap-5 p-5 bg-slate-50 border-[#cdb4db] border-[2px] rounded-md">
        <div className="text-center flex flex-col gap-2.5 ">
          <h1 className="text-2xl font-semibold text-[#cdb4db]">
            Glamour Avenue
          </h1>
          <h1 className="text-xl font-semibold ">Welcome Admin!!</h1>
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#cdb4db] text-white rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
