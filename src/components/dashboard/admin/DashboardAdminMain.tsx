import { useState } from 'react';
import { Users, Activity, Server, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell } from 'recharts';
import { ChartContainer } from '../../ui/chart';

interface UserData {
  nip: string;
  nama: string;
  role: string;
  daerah: string;
  lastLogin: string;
  status: string;
}

const userGrowthData = [
  { bulan: 'Jul', users: 850 },
  { bulan: 'Agu', users: 920 },
  { bulan: 'Sep', users: 1050 },
  { bulan: 'Okt', users: 1200 },
  { bulan: 'Nov', users: 1350 },
  { bulan: 'Des', users: 1500 },
];

const roleDistribution = [
  { name: 'Daerah', value: 800, color: '#3b82f6' },
  { name: 'Petugas', value: 600, color: '#10b981' },
  { name: 'Verifikator', value: 80, color: '#f59e0b' },
  { name: 'Admin', value: 20, color: '#ef4444' },
];

const mockActiveUsers = [
  { nip: '198501012010011001', nama: 'Budi Santoso', role: 'Petugas', daerah: 'DKI Jakarta', lastLogin: '2025-10-12 09:30', status: 'Aktif' },
  { nip: '198601012011011002', nama: 'Siti Nurhaliza', role: 'Verifikator', daerah: 'Jawa Barat', lastLogin: '2025-10-12 08:15', status: 'Aktif' },
  { nip: '198701012012011003', nama: 'Ahmad Fauzi', role: 'Daerah', daerah: 'Jawa Tengah', lastLogin: '2025-10-11 16:45', status: 'Aktif' },
];

export function DashboardAdminMain({ user }: any) {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Dashboard Admin</h2>
        <p className="text-gray-600 mt-1">
          Monitoring sistem dan statistik global
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Total Users
            </CardTitle>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">1,500</div>
            <p className="text-xs text-green-600 mt-1">
              +150 bulan ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Active Sessions
            </CardTitle>
            <div className="bg-green-100 p-2 rounded-lg">
              <Activity className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">342</div>
            <p className="text-xs text-gray-500 mt-1">
              Users online saat ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              System Health
            </CardTitle>
            <div className="bg-green-100 p-2 rounded-lg">
              <Server className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">99.8%</div>
            <p className="text-xs text-gray-500 mt-1">
              Uptime bulan ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              System Alerts
            </CardTitle>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">3</div>
            <p className="text-xs text-gray-500 mt-1">
              Memerlukan perhatian
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <XAxis dataKey="bulan" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Users */}
      <Card>
        <CardHeader>
          <CardTitle>User Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIP</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Daerah</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockActiveUsers.map((userData, index) => (
                <TableRow key={index} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedUser(userData)}>
                  <TableCell className="font-mono text-sm">{userData.nip}</TableCell>
                  <TableCell>{userData.nama}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{userData.role}</Badge>
                  </TableCell>
                  <TableCell>{userData.daerah}</TableCell>
                  <TableCell>{userData.lastLogin}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {userData.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-900">System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="text-yellow-800">⚠️ Backup Terakhir: 1 jam yang lalu</p>
            <p className="text-yellow-800">⚠️ Disk Usage: 78% (2TB tersisa)</p>
            <p className="text-yellow-800">⚠️ Scheduled Maintenance: 15 Oktober 2025, 22:00 WIB</p>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">NIP</label>
                <p className="font-mono">{selectedUser.nip}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Nama Lengkap</label>
                <p>{selectedUser.nama}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Role</label>
                <div className="mt-1">
                  <Badge variant="secondary">{selectedUser.role}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Daerah</label>
                <p>{selectedUser.daerah}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Last Login</label>
                <p>{selectedUser.lastLogin}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status Akun</label>
                <div className="mt-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="text-sm">user.{selectedUser.nama.toLowerCase().replace(' ', '.')}@kemendag.go.id</p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button className="flex-1 bg-blue-900 hover:bg-blue-800">
                  Edit User
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setSelectedUser(null)}
                >
                  Tutup
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
