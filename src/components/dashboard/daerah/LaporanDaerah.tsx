import { useState } from 'react';
import { FileDown, Printer, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartContainer } from '../../ui/chart';
import { toast } from 'sonner';

const mockLaporanData = [
  { nip: '198501012010011001', nama: 'Budi Santoso', status: 'Aktif', tanggalKadaluarsa: '2026-05-15', verifikasiOleh: 'Verifikator A' },
  { nip: '198601012011011002', nama: 'Siti Nurhaliza', status: 'Aktif', tanggalKadaluarsa: '2026-03-20', verifikasiOleh: 'Verifikator B' },
  { nip: '198701012012011003', nama: 'Ahmad Fauzi', status: 'Kadaluarsa', tanggalKadaluarsa: '2024-12-10', verifikasiOleh: 'Verifikator A' },
  { nip: '198801012013011004', nama: 'Dewi Lestari', status: 'Pending', tanggalKadaluarsa: '2026-08-25', verifikasiOleh: '-' },
];

const chartData = [
  { status: 'Aktif', jumlah: 105 },
  { status: 'Kadaluarsa', jumlah: 30 },
  { status: 'Pending', jumlah: 15 },
];

export function LaporanDaerah({ user }: any) {
  const [filters, setFilters] = useState({
    status: 'semua',
    startDate: '',
    endDate: '',
  });

  const handleGeneratePDF = () => {
    toast.success('Laporan PDF sedang diproses...');
    // In real app, this would generate PDF
  };

  const handleGenerateExcel = () => {
    toast.success('Laporan Excel sedang diproses...');
    // In real app, this would generate Excel
  };

  const handlePrintPreview = () => {
    window.print();
  };

  const filteredData = mockLaporanData.filter(item => {
    if (filters.status !== 'semua' && item.status.toLowerCase() !== filters.status) {
      return false;
    }
    return true;
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
        <h2 className="text-gray-900">Laporan Daerah</h2>
        <p className="text-gray-600 mt-1">
          Generasi laporan personel metrologi {user.daerah || 'DKI Jakarta'}
        </p>
      </div>

      {/* Filter Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Laporan
          </CardTitle>
          <CardDescription>
            Sesuaikan parameter laporan sesuai kebutuhan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="status">Status Sertifikasi</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Status</SelectItem>
                  <SelectItem value="aktif">Aktif</SelectItem>
                  <SelectItem value="kadaluarsa">Kadaluarsa</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate">Tanggal Mulai</Label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="endDate">Tanggal Akhir</Label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">
              Reset Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chart Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Rekap Per Status</CardTitle>
          <CardDescription>
            Distribusi status sertifikasi personel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#3b82f6" name="Jumlah Personel" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Data Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Preview Data Laporan</CardTitle>
              <CardDescription>
                {filteredData.length} data ditemukan
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleGeneratePDF} className="gap-2">
                <FileDown className="h-4 w-4" />
                PDF
              </Button>
              <Button onClick={handleGenerateExcel} variant="outline" className="gap-2">
                <FileDown className="h-4 w-4" />
                Excel
              </Button>
              <Button onClick={handlePrintPreview} variant="outline" className="gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIP</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Kadaluarsa</TableHead>
                <TableHead>Verifikasi Oleh</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{item.nip}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusBadge(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(item.tanggalKadaluarsa).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>{item.verifikasiOleh}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Report Info */}
      <Card className="print:block">
        <CardContent className="p-6">
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Daerah:</span>
              <span className="text-gray-900">{user.daerah || 'DKI Jakarta'}</span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal Generate:</span>
              <span className="text-gray-900">{new Date().toLocaleDateString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span>Dihasilkan oleh:</span>
              <span className="text-gray-900">{user.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
