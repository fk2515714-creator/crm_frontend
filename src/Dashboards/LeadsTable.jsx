import React from "react";

export default function LeadsTable({ recentLeads = [] }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b bg-slate-50">
        <h3 className="text-base font-semibold text-slate-800">Recent Leads</h3>
        <button className="text-sm font-medium text-cyan-600 hover:text-cyan-700 transition">
          View all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Name</th>
              <th className="px-5 py-3 text-left font-medium">Company</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
              <th className="px-5 py-3 text-left font-medium">Last Activity</th>
            </tr>
          </thead>

          <tbody>
            {recentLeads.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-6 text-center text-slate-400"
                >
                  No recent leads
                </td>
              </tr>
            ) : (
              recentLeads.map((lead, idx) => (
                <tr key={idx} className="border-t hover:bg-slate-50 transition">
                  <td className="px-5 py-3 font-medium text-slate-800">
                    {lead.name || "N/A"}
                  </td>

                  <td className="px-5 py-3 text-slate-600">
                    {lead.company || "Unknown"}
                  </td>

                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium
                        ${
                          lead.status === "Won"
                            ? "bg-emerald-100 text-emerald-700"
                            : lead.status === "In Progress"
                            ? "bg-amber-100 text-amber-700"
                            : lead.status === "Follow Up"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {lead.status || "N/A"}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-slate-500 text-xs">
                    {lead.date || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
