import React from "react";
import { Bell, Send, Users, Info, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

export default function SystemNotifications() {
  const handleSend = () => {
    toast.success("Notification broadcasted successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center">
          <Bell size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">System Notifications</h1>
          <p className="text-sm text-gray-500">Broadcast alerts and messages to all users</p>
        </div>
        <div className="ml-auto">
          <button 
            onClick={handleSend}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <Send size={16} /> Broadcast Notification
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Compose Message</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
            <input type="text" placeholder="e.g., Scheduled Maintenance" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
            <textarea rows={4} placeholder="Enter the detailed message here..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="audience" className="text-indigo-600 focus:ring-indigo-500" defaultChecked />
                  <span className="text-sm text-gray-700">All Users</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="audience" className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-gray-700">Admins Only</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="severity" className="text-blue-500 focus:ring-blue-500" defaultChecked />
                  <span className="text-sm text-gray-700 flex items-center gap-1"><Info size={14} className="text-blue-500" /> Info</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="severity" className="text-amber-500 focus:ring-amber-500" />
                  <span className="text-sm text-gray-700 flex items-center gap-1"><AlertTriangle size={14} className="text-amber-500" /> Warning</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
