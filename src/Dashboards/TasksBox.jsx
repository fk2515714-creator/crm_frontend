import React from "react";

export default function TasksBox({ tasks = [] }) {
  return (
    <div
      className="
        rounded-2xl
        bg-white
        shadow-sm
        border border-[#ead7c0]
        p-5
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[#3b2a24]">
            Today’s Tasks
          </h3>
          <p className="text-xs text-[#7a5a3a]">Keep track of your day</p>
        </div>

        <button
          className="
            text-sm font-medium
            text-[#b08a63]
            hover:text-[#9c774b]
            transition
          "
        >
          View all
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-[#9c774b] text-center py-6">
            No tasks for today
          </p>
        ) : (
          tasks.map((task, idx) => (
            <div
              key={idx}
              className="
                rounded-xl
                border border-[#ead7c0]
                bg-[#f7f2ec]
                p-3
                hover:bg-[#f3e6d8]
                transition
              "
            >
              <p className="text-sm font-medium text-[#3b2a24]">
                {task.title || "Untitled Task"}
              </p>
              <p className="text-xs text-[#7a5a3a] mt-0.5">
                {task.time || "-"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Add Task */}
      <button
        className="
          mt-4 w-full py-2.5
          rounded-xl
          border border-dashed border-[#d9b48a]
          text-sm font-medium
          text-[#7a5a3a]
          hover:bg-[#f3e6d8]
          transition
        "
      >
        + Add Task
      </button>
    </div>
  );
}
