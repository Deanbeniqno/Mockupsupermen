import { useState } from 'react';
import { Users, AlertCircle, CheckCircle, Clock, FileDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer } from '../../ui/chart';

interface PersonelData {
  nip: string;
  nama: string;
  daerah: string;
  status: string;
  verifikasiOleh: string;
}

const mockPersonelNasional = [
  { nip: '198501012010011001', nama: 'Budi Santoso', daerah: 'DKI Jakarta', status: 'Aktif', verifikasiOleh: 'Verifikator A' },
  { nip: '198601012011011002', nama: 'Siti Nurhaliza', daerah: 'Jawa Barat', status: 'Aktif', verifikasiOleh: 'Verifikator B' },
  { nip: '198701012012011003', nama: 'Ahmad Fauzi', daerah: 'Jawa Tengah', status: 'Kadaluarsa', verifikasiOleh: 'Verifikator A' },
  { nip: '198801012013011004', nama: 'Dewi Lestari', daerah: 'Jawa Timur', status: 'Pending', verifikasiOleh: '-' },
  { nip: '198901012014011005', nama: 'Eko Prasetyo', daerah: 'Banten', status: 'Aktif', verifikasiOleh: 'Verifikator C' },
];

const statusDistribution = [
  { name: 'Aktif', value: 3500, color: '#10b981' },
  { name: 'Kadaluarsa', value: 1200, color: '#ef4444' },
  { name: 'Pending', value: 300, color: '#f59e0b' },
];

export function DashboardVerifikatorMain({ user }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvinsi, setFilterProvinsi] = useState('semua');
  const [selectedPersonel, setSelectedPersonel] = useState<PersonelData | null>(null);

  const filteredPersonel = mockPersonelNasional.filter(p => {
    const matchesSearch = p.nip.includes(searchTerm) || p.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvinsi = filterProvinsi === 'semua' || p.daerah === filterProvinsi;
    return matchesSearch && matchesProvinsi;
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
      <div>
        <h2 className="text-gray-900">Dashboard Verifikator</h2>
        <p className="text-gray-600 mt-1">
          Statistik dan data personel metrologi nasional
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Total Personel
            </CardTitle>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">5,000</div>
            <p className="text-xs text-green-600 mt-1">
              +150 dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Pending Verifikasi
            </CardTitle>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">200</div>
            <p className="text-xs text-gray-500 mt-1">
              Memerlukan tindakan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Terverifikasi
            </CardTitle>
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">3,500</div>
            <p className="text-xs text-gray-500 mt-1">
              Sertifikasi aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Kadaluarsa
            </CardTitle>
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">1,200</div>
            <p className="text-xs text-gray-500 mt-1">
              Perlu perpanjangan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Status Nasional</CardTitle>
          <CardDescription>
            Persentase status sertifikasi personel di seluruh Indonesia
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

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Data Personel Nasional</CardTitle>
              <CardDescription>
                Daftar personel metrologi di seluruh Indonesia
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
          <div className="flex gap-4 mt-4">
            <Input
              placeholder="Cari NIP atau nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={filterProvinsi} onValueChange={setFilterProvinsi}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter Provinsi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Provinsi</SelectItem>
                <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
                <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                <SelectItem value="Banten">Banten</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIP</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Daerah</TableHead>
                <TableHead>Status Sertifikasi</TableHead>
                <TableHead>Verifikasi Oleh</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPersonel.map((personel, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{personel.nip}</TableCell>
                  <TableCell>{personel.nama}</TableCell>
                  <TableCell>{personel.daerah}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusBadge(personel.status)}>
                      {personel.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{personel.verifikasiOleh}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedPersonel(personel)}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selectedPersonel} onOpenChange={() => setSelectedPersonel(null)}>
        <DialogContent className="max-w-md">
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
                <label className="text-sm text-gray-600">Daerah</label>
                <p>{selectedPersonel.daerah}</p>
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
                <label className="text-sm text-gray-600">Diverifikasi Oleh</label>
                <p>{selectedPersonel.verifikasiOleh}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="text-sm">personel.{selectedPersonel.nama.toLowerCase().replace(' ', '.')}@kemendag.go.id</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Jabatan</label>
                <p>Petugas Metrologi</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tanggal Terakhir Verifikasi</label>
                <p>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button className="flex-1 bg-blue-900 hover:bg-blue-800">
                  Lihat Riwayat Sertifikasi
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setSelectedPersonel(null)}
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
