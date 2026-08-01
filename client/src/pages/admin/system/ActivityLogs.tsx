import React from "react";
import { Activity, Clock, ShieldAlert, Monitor, ArrowUpRight } from "lucide-react";

export default function ActivityLogs() {
  const mockLogs = [
    { action: "User Login", user: "admin@nowscripts.com", time: "2 mins ago", ip: "192.168.1.1", status: "success", type: "auth" },
    { action: "Deleted Post", user: "john@example.com", time: "15 mins ago", ip: "10.0.0.5", status: "success", type: "content" },
    { action: "Failed Login", user: "unknown", time: "1 hour ago", ip: "45.22.11.3", status: "failed", type: "security" },
    { action: "Updated Settings", user: "admin@nowscripts.com", time: "2 hours ago", ip: "192.168.1.1", status: "success", type: "system" },
    { action: "Created User", user: "admin@nowscripts.com", time: "5 hours ago", ip: "192.168.1.1", status: "success", type: "admin" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'auth': return <Monitor size={16} className="text-blue-500" />;
      case 'security': return <ShieldAlert size={16} className="text-red-500" />;
      case 'system': return <Activity size={16} className="text-emerald-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center">
          <Activity size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Activity Logs</h1>
          <p className="text-sm text-gray-500">Monitor system events and user actions</p>
        </div>
        <div className="ml-auto">
          <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            <ArrowUpRight size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockLogs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${log.status === 'failed' ? 'bg-red-50' : 'bg-gray-50'}`}>
                        {getIcon(log.type)}
                      </div>
                      <span className="font-semibold text-gray-900">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{log.user}</td>
                  <td className="px-6 py-4">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{log.ip}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      log.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
