import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Button } from '../../ui/button';
import { FileDown, Filter } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell } from 'recharts';
import { ChartContainer } from '../../ui/chart';

const mockAuditData = [
  { id: 1, personelNip: '198501012010011001', aksi: 'Login', waktu: '2025-10-12 09:30:15', oldValues: '-', newValues: '-', pelaku: 'Petugas', ipAddress: '192.168.1.100' },
  { id: 2, personelNip: '198601012011011002', aksi: 'Update Sertifikasi', waktu: '2025-10-12 08:15:22', oldValues: '{"status":"Pending"}', newValues: '{"status":"Diverifikasi"}', pelaku: 'Verifikator', ipAddress: '192.168.1.101' },
  { id: 3, personelNip: 'SYSTEM', aksi: 'Backup Database', waktu: '2025-10-12 02:00:00', oldValues: '-', newValues: '-', pelaku: 'System', ipAddress: 'localhost' },
];

const aksiTrendData = [
  { hari: 'Sen', jumlah: 145 },
  { hari: 'Sel', jumlah: 168 },
  { hari: 'Rab', jumlah: 152 },
  { hari: 'Kam', jumlah: 189 },
  { hari: 'Jum', jumlah: 176 },
];

const aksiDistribution = [
  { name: 'Login', value: 40, color: '#3b82f6' },
  { name: 'CRUD', value: 35, color: '#10b981' },
  { name: 'Verifikasi', value: 15, color: '#f59e0b' },
  { name: 'System', value: 10, color: '#6b7280' },
];

export function AuditFull({ user }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Audit Full</h2>
          <p className="text-gray-600 mt-1">
            Log lengkap semua aktivitas sistem dengan security tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter Anomaly
          </Button>
          <Button variant="outline" className="gap-2">
            <FileDown className="h-4 w-4" />
            Export Full Log
          </Button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tren Aktivitas Harian</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aksiTrendData}>
                  <XAxis dataKey="hari" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="jumlah" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Jenis Aksi</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aksiDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {aksiDistribution.map((entry, index) => (
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

      {/* Audit Table */}
      <Card>
        <CardHeader>
          <CardTitle>Log Aktivitas Lengkap</CardTitle>
          <CardDescription>
            Semua aktivitas sistem dengan detail JSON dan IP tracking
          </CardDescription>
          <div className="flex gap-4 mt-4">
            <Input placeholder="Cari NIP atau aksi..." className="max-w-sm" />
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Role</SelectItem>
                <SelectItem value="petugas">Petugas</SelectItem>
                <SelectItem value="verifikator">Verifikator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>NIP/Personel</TableHead>
                <TableHead>Aksi</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Role Pelaku</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditData.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.id}</TableCell>
                  <TableCell className="font-mono text-sm">{log.personelNip}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{log.aksi}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{log.waktu}</TableCell>
                  <TableCell>{log.pelaku}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View JSON</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
