import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { FileDown, Printer } from 'lucide-react';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartContainer } from '../../ui/chart';

const mockChartData = [
  { daerah: 'Jakarta', aktif: 450, kadaluarsa: 120, pending: 30 },
  { daerah: 'Jabar', aktif: 520, kadaluarsa: 180, pending: 45 },
  { daerah: 'Jateng', aktif: 380, kadaluarsa: 95, pending: 25 },
  { daerah: 'Jatim', aktif: 490, kadaluarsa: 150, pending: 38 },
  { daerah: 'Banten', aktif: 290, kadaluarsa: 75, pending: 20 },
];

export function LaporanNasional({ user }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Laporan Nasional</h2>
        <p className="text-gray-600 mt-1">
          Generasi laporan komprehensif tingkat nasional
        </p>
      </div>

      {/* Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Advanced</CardTitle>
          <CardDescription>
            Sesuaikan parameter laporan sesuai kebutuhan analisis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Provinsi</Label>
              <Select defaultValue="semua">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Provinsi</SelectItem>
                  <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                  <SelectItem value="jabar">Jawa Barat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tanggal Mulai</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Tanggal Akhir</Label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Status Per Daerah</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <XAxis dataKey="daerah" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="aktif" fill="#10b981" name="Aktif" />
                <Bar dataKey="kadaluarsa" fill="#ef4444" name="Kadaluarsa" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Export */}
      <Card>
        <CardHeader>
          <CardTitle>Export Laporan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button className="gap-2">
              <FileDown className="h-4 w-4" />
              Generate PDF Lengkap
            </Button>
            <Button variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" />
              Excel Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print Preview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
