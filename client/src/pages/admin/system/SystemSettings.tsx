import React from "react";
import { Settings, Save, Shield, Database, Mail, Bell } from "lucide-react";
import toast from "react-hot-toast";

export default function SystemSettings() {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gray-100 text-gray-700 rounded-xl flex items-center justify-center">
          <Settings size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">System Settings</h1>
          <p className="text-sm text-gray-500">Manage global platform configurations</p>
        </div>
        <div className="ml-auto">
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium text-sm flex items-center gap-3">
            <Shield size={18} /> Security
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-lg font-medium text-sm flex items-center gap-3 transition-colors">
            <Database size={18} /> Database
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-lg font-medium text-sm flex items-center gap-3 transition-colors">
            <Mail size={18} /> Email Server
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-lg font-medium text-sm flex items-center gap-3 transition-colors">
            <Bell size={18} /> Notifications
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Security Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input type="number" defaultValue={60} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Login Attempts</label>
                <input type="number" defaultValue={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-now-primary focus:border-transparent outline-none" />
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div>
                  <h4 className="font-medium text-gray-900">Require Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Enforce 2FA for all admin accounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div>
                  <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                  <p className="text-sm text-gray-500">Disable access for non-admin users</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
