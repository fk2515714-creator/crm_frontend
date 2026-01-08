import React from "react";

export default function QuickNote() {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-[#ead7c0] p-5">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-[#3b2a24]">Quick Note</h3>
        <p className="text-xs text-[#7a5a3a]">Write something for later</p>
      </div>

      {/* Textarea */}
      <textarea
        rows={3}
        placeholder="Write a note..."
        className="
          w-full resize-none px-3 py-2 rounded-xl
          border border-[#d6bfa6]
          bg-[#f7f2ec]
          text-sm text-[#3b2a24]
          placeholder-[#9c7b59]
          focus:outline-none
          focus:ring-2 focus:ring-[#b08a63]
          focus:border-transparent
          transition
        "
      />

      {/* Button */}
      <div className="flex justify-end">
        <button
          className="
            mt-3 px-4 py-1.5 rounded-full
            bg-gradient-to-r from-[#b08a63] to-[#9c774b]
            text-white text-xs font-medium
            hover:from-[#9c774b] hover:to-[#8a653f]
            transition
          "
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
