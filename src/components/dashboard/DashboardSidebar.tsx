import { 
  BarChart3, 
  FileText, 
  Settings, 
  Users, 
  Shield,
  Bell,
  Activity,
  FileCheck,
  ClipboardList,
  Database,
  AlertTriangle
} from 'lucide-react';

type UserRole = 'daerah' | 'petugas' | 'verifikator' | 'admin';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface DashboardSidebarProps {
  role: UserRole;
  currentMenu: string;
  onMenuChange: (menu: string) => void;
  sidebarOpen: boolean;
  onClose: () => void;
}

const menuItems: Record<UserRole, MenuItem[]> = {
  daerah: [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'input-data', label: 'Input Data', icon: FileText },
    { id: 'laporan', label: 'Laporan Saya', icon: ClipboardList },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ],
  petugas: [
    { id: 'dashboard', label: 'Dashboard Pribadi', icon: BarChart3 },
    { id: 'sertifikasi', label: 'Sertifikasi Saya', icon: FileCheck },
    { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
  ],
  verifikator: [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'verifikasi', label: 'Verifikasi Pending', icon: Shield },
    { id: 'audit', label: 'Audit Log', icon: Activity },
    { id: 'laporan', label: 'Laporan Nasional', icon: ClipboardList },
    { id: 'alert', label: 'Pengaturan Alert', icon: AlertTriangle },
  ],
  admin: [
    { id: 'dashboard', label: 'Dashboard Admin', icon: BarChart3 },
    { id: 'users', label: 'Manajemen User', icon: Users },
    { id: 'config', label: 'Konfigurasi Sistem', icon: Settings },
    { id: 'laporan', label: 'Semua Laporan', icon: ClipboardList },
    { id: 'audit', label: 'Audit Full', icon: Database },
  ],
};

export function DashboardSidebar({ 
  role, 
  currentMenu, 
  onMenuChange, 
  sidebarOpen,
  onClose
}: DashboardSidebarProps) {
  const items = menuItems[role];

  const handleMenuClick = (menuId: string) => {
    onMenuChange(menuId);
    onClose();
  };

  return (
    <aside
      className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
    >
      <nav className="p-4 space-y-2 mt-16 lg:mt-0">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
