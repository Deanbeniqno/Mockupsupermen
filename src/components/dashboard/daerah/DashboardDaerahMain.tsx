import { useState } from 'react';
import { RefreshCw, Users, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Cell, Pie, PieChart, ResponsiveContainer, Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartContainer } from '../../ui/chart';

interface PersonelData {
  id: number;
  nip: string;
  nama: string;
  jabatan: string;
  status: 'Aktif' | 'Kadaluarsa' | 'Pending';
  tanggalKadaluarsa: string;
}

const mockPersonel: PersonelData[] = [
  { id: 1, nip: '198501012010011001', nama: 'Budi Santoso', jabatan: 'Petugas Kalibrasi', status: 'Aktif', tanggalKadaluarsa: '2026-05-15' },
  { id: 2, nip: '198601012011011002', nama: 'Siti Nurhaliza', jabatan: 'Pengawas', status: 'Aktif', tanggalKadaluarsa: '2026-03-20' },
  { id: 3, nip: '198701012012011003', nama: 'Ahmad Fauzi', jabatan: 'Petugas Kalibrasi', status: 'Kadaluarsa', tanggalKadaluarsa: '2024-12-10' },
  { id: 4, nip: '198801012013011004', nama: 'Dewi Lestari', jabatan: 'Verifikator', status: 'Pending', tanggalKadaluarsa: '2026-08-25' },
  { id: 5, nip: '198901012014011005', nama: 'Eko Prasetyo', jabatan: 'Petugas Kalibrasi', status: 'Aktif', tanggalKadaluarsa: '2025-11-30' },
  { id: 6, nip: '199001012015011006', nama: 'Rina Wati', jabatan: 'Pengawas', status: 'Kadaluarsa', tanggalKadaluarsa: '2024-09-15' },
];

const statusDistribution = [
  { name: 'Aktif', value: 105, color: '#10b981' },
  { name: 'Kadaluarsa', value: 30, color: '#ef4444' },
  { name: 'Pending', value: 15, color: '#f59e0b' },
];

const monthlyTrend = [
  { bulan: 'Jul', jumlah: 12 },
  { bulan: 'Agu', jumlah: 18 },
  { bulan: 'Sep', jumlah: 15 },
  { bulan: 'Okt', jumlah: 22 },
  { bulan: 'Nov', jumlah: 19 },
  { bulan: 'Des', jumlah: 25 },
];

export function DashboardDaerahMain({ user }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'status' | 'nama'>('status');
  const [selectedPersonel, setSelectedPersonel] = useState<PersonelData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredPersonel = mockPersonel
    .filter(p => 
      p.nip.includes(searchTerm) || 
      p.nama.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'status') {
        const statusOrder = { 'Kadaluarsa': 0, 'Pending': 1, 'Aktif': 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return a.nama.localeCompare(b.nama);
    });

  const getStatusBadge = (status: string) => {
    const variants = {
      'Aktif': 'bg-green-100 text-green-700',
      'Kadaluarsa': 'bg-red-100 text-red-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
    };
    return variants[status as keyof typeof variants];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Dashboard Daerah</h2>
          <p className="text-gray-600 mt-1">
            Rekap Personel Metrologi - {user.daerah || 'DKI Jakarta'}
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          className="gap-2"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Personel Aktif
            </CardTitle>
            <div className="bg-green-100 p-2 rounded-lg">
              <Users className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">150</div>
            <p className="text-xs text-gray-500 mt-1">
              Total personel dengan sertifikasi aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Reminder Bulan Ini
            </CardTitle>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">5</div>
            <p className="text-xs text-gray-500 mt-1">
              Sertifikasi yang akan kadaluarsa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Status Kadaluarsa
            </CardTitle>
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">30</div>
            <p className="text-xs text-gray-500 mt-1">
              Memerlukan perpanjangan segera
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Status Sertifikasi</CardTitle>
            <CardDescription>
              Persentase status personel di daerah Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tren Sertifikasi Bulanan</CardTitle>
            <CardDescription>
              Jumlah sertifikasi baru per bulan (6 bulan terakhir)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend}>
                  <XAxis dataKey="bulan" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="jumlah" fill="#3b82f6" name="Sertifikasi Baru" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rekap Personel</CardTitle>
          <CardDescription>
            Daftar lengkap personel metrologi di daerah Anda
          </CardDescription>
          <div className="flex gap-4 mt-4">
            <Input
              placeholder="Cari NIP atau nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'status' | 'nama')}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="status">Urutkan by Status</option>
              <option value="nama">Urutkan by Nama</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIP</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Status Sertifikasi</TableHead>
                <TableHead>Tanggal Kadaluarsa</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPersonel.map((personel) => (
                <TableRow 
                  key={personel.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedPersonel(personel)}
                >
                  <TableCell className="font-mono text-sm">{personel.nip}</TableCell>
                  <TableCell>{personel.nama}</TableCell>
                  <TableCell>{personel.jabatan}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusBadge(personel.status)}>
                      {personel.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(personel.tanggalKadaluarsa).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Detail</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selectedPersonel} onOpenChange={() => setSelectedPersonel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Personel</DialogTitle>
          </DialogHeader>
          {selectedPersonel && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">NIP</label>
                <p className="font-mono">{selectedPersonel.nip}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Nama Lengkap</label>
                <p>{selectedPersonel.nama}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Jabatan</label>
                <p>{selectedPersonel.jabatan}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status Sertifikasi</label>
                <div className="mt-1">
                  <Badge variant="secondary" className={getStatusBadge(selectedPersonel.status)}>
                    {selectedPersonel.status}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tanggal Kadaluarsa</label>
                <p>{new Date(selectedPersonel.tanggalKadaluarsa).toLocaleDateString('id-ID')}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Edit Data</Button>
                <Button variant="outline" className="flex-1" onClick={() => setSelectedPersonel(null)}>
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
