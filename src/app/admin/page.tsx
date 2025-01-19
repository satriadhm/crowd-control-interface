'use client';

import UserManagement from '../components/admin/UserManagement';
import TaskManagement from '../components/admin/TaskManagement';

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <UserManagement />
      <TaskManagement />
    </div>
  );
}
