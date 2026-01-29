import { useState } from 'react';
import { 
  Scale, 
  LogOut, 
  FileText, 
  Users, 
  CheckCircle, 
  Clock,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    nip: string;
    jabatan: string;
  };
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: 'Total Verifikasi',
      value: '248',
      icon: FileText,
      change: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Menunggu Approval',
      value: '15',
      icon: Clock,
      change: '+3',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Selesai Bulan Ini',
      value: '42',
      icon: CheckCircle,
      change: '+18%',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Petugas Aktif',
      value: '8',
      icon: Users,
      change: '+2',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Verifikasi Timbangan Digital',
      location: 'Pasar Tanah Abang',
      status: 'Selesai',
      date: '12 Okt 2025',
    },
    {
      id: 2,
      title: 'Inspeksi Alat Ukur Bensin',
      location: 'SPBU Gatot Subroto',
      status: 'Proses',
      date: '11 Okt 2025',
    },
    {
      id: 3,
      title: 'Kalibrasi Timbangan Emas',
      location: 'Toko Emas Setiabudi',
      status: 'Menunggu',
      date: '10 Okt 2025',
    },
    {
      id: 4,
      title: 'Verifikasi Meter Air',
      location: 'Gedung Perkantoran Sudirman',
      status: 'Selesai',
      date: '9 Okt 2025',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-700';
      case 'Proses':
        return 'bg-blue-100 text-blue-700';
      case 'Menunggu':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
              <div className="bg-blue-900 p-2 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-blue-900">SUPERMEN</h1>
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
                onClick={onLogout}
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
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
        >
          <nav className="p-4 space-y-2 mt-16 lg:mt-0">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-900">
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              <FileText className="h-5 w-5" />
              <span>Verifikasi</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              <Users className="h-5 w-5" />
              <span>Petugas</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              <Settings className="h-5 w-5" />
              <span>Pengaturan</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-gray-900 mb-2">
              Selamat Datang, {user.name}
            </h2>
            <p className="text-gray-600">
              NIP: {user.nip} | {user.email}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`${stat.bgColor} p-2 rounded-lg`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <p className={`text-xs ${stat.color}`}>
                      {stat.change} dari bulan lalu
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>
                Riwayat verifikasi dan inspeksi UTTP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {activity.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(activity.status)}
                      >
                        {activity.status}
                      </Badge>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {activity.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-blue-900 hover:bg-blue-800 h-auto py-4">
              <FileText className="h-5 w-5 mr-2" />
              Buat Laporan Baru
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <Users className="h-5 w-5 mr-2" />
              Kelola Tim
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <BarChart3 className="h-5 w-5 mr-2" />
              Lihat Statistik
            </Button>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
