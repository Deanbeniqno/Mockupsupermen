import { useState } from 'react';
import { Scale, LogOut, Bell, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { DashboardSidebar } from './dashboard/DashboardSidebar';
import { DashboardDaerah } from './dashboard/DashboardDaerah';
import { DashboardPetugas } from './dashboard/DashboardPetugas';
import { DashboardVerifikator } from './dashboard/DashboardVerifikator';
import { DashboardAdmin } from './dashboard/DashboardAdmin';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

type UserRole = 'daerah' | 'petugas' | 'verifikator' | 'admin';

interface User {
  name: string;
  email: string;
  nip: string;
  jabatan: string;
  role: UserRole;
  daerah?: string;
}

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
}

export function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('dashboard');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  const renderDashboardContent = () => {
    switch (user.role) {
      case 'daerah':
        return <DashboardDaerah currentMenu={currentMenu} user={user} />;
      case 'petugas':
        return <DashboardPetugas currentMenu={currentMenu} user={user} />;
      case 'verifikator':
        return <DashboardVerifikator currentMenu={currentMenu} user={user} />;
      case 'admin':
        return <DashboardAdmin currentMenu={currentMenu} user={user} />;
      default:
        return <DashboardDaerah currentMenu={currentMenu} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <div className="bg-gradient-to-br from-blue-600 to-blue-900 p-2 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-blue-900">SUPERMEN</h1>
                <p className="text-xs text-gray-600 hidden sm:block">
                  {user.role === 'admin' && 'Administrator Pusat'}
                  {user.role === 'verifikator' && 'Verifikator Nasional'}
                  {user.role === 'petugas' && 'Petugas Metrologi'}
                  {user.role === 'daerah' && `Pemerintah Daerah - ${user.daerah}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.jabatan}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogoutDialog(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar
          role={user.role}
          currentMenu={currentMenu}
          onMenuChange={setCurrentMenu}
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {renderDashboardContent()}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Anda yakin ingin logout? Semua sesi akan dihapus dan Anda harus login kembali untuk mengakses sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
              Ya, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
