"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [validation, setValidation] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setValidation(true);
    } else {
      setValidation(false);
      router.push(`/notes/search?query=${searchQuery.trim()}`);
    }
  };

  return (
    <div className={className}>
      <div className="flex gap-2">
        <input
          className="border pl-3 pr-3 w-32 bg-gray-300"
          type="text"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          className="border p-2 rounded-lg bg-gray-300 hover:bg-gray-200 flex items-center justify-center"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {validation ? <p className="text-red-400">Enter search query</p> : null}
    </div>
  );
}
