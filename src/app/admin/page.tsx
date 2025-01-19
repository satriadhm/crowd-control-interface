'use client';

import UserManagement from '../components/admin/UserManagement';
import TaskManagement from '../components/admin/TaskManagement';

export default function AdminPage() {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="space-y-6"> {/* Space between sections */}
        <div className="bg-white shadow-lg p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <UserManagement />
        </div>
        <div className="bg-white shadow-lg p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">Task Management</h2>
          <TaskManagement />
        </div>
      </div>
    </div>
  );
}
