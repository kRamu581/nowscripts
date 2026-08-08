import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../baseUrl";
import { useAuth } from "../../contexts/Auth";
import { BarChart3, MessageSquareWarning, Search, Bot } from "lucide-react";

interface Log {
  _id: string;
  userId?: { name: string; email: string };
  conversationId: string;
  message: string;
  response: string;
  scopeGuardVerdict: "in_scope" | "out_of_scope";
  feedback?: "up" | "down";
  createdAt: string;
}

export default function CopilotAdmin() {
  const { AuthToken } = useAuth();
  const [logs, setLogs] = useState<Log[]>([]);
  const [metrics, setMetrics] = useState({ totalQueries: 0, outOfScopeAttempts: 0, outOfScopeRate: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`${url}/api/copilot/logs`, {
          headers: { Authorization: `Bearer ${AuthToken}` }
        });
        setLogs(res.data.logs);
        setMetrics(res.data.metrics);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [AuthToken]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Bot className="w-8 h-8 text-now-primary" />
        <h1 className="text-2xl font-bold text-gray-900">Copilot Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-2">
            <BarChart3 className="w-5 h-5" />
            <h3 className="font-medium">Total Queries</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.totalQueries}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-2">
            <Search className="w-5 h-5" />
            <h3 className="font-medium">Out of Scope Denials</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.outOfScopeAttempts}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-2">
            <MessageSquareWarning className="w-5 h-5" />
            <h3 className="font-medium">Denial Rate</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.outOfScopeRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Recent Conversations</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading logs...</div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No logs found.</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">Query</th>
                  <th className="px-6 py-4 font-medium">Verdict</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {log.userId ? (
                        <div>
                          <div className="font-medium text-gray-900">{log.userId.name}</div>
                          <div className="text-xs text-gray-500">{log.userId.email}</div>
                        </div>
                      ) : (
                        <span className="text-gray-500">Anonymous</span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <div className="truncate text-gray-900">{log.message}</div>
                      <div className="truncate text-xs text-gray-500 mt-1">{log.response}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        log.scopeGuardVerdict === 'in_scope' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {log.scopeGuardVerdict === 'in_scope' ? 'In Scope' : 'Out of Scope'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
