import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { FileDown } from 'lucide-react';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';

export function SemuaLaporan({ user }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Semua Laporan</h2>
        <p className="text-gray-600 mt-1">
          Akses dan generasi laporan lengkap dengan query custom
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
          <CardDescription>
            Buat laporan custom dengan parameter advanced
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Group By</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih grouping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="role">Role</SelectItem>
                  <SelectItem value="daerah">Daerah</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Time Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 Hari Terakhir</SelectItem>
                  <SelectItem value="30days">30 Hari Terakhir</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <FileDown className="h-4 w-4" />
              Generate Custom Report
            </Button>
            <Button variant="outline">Save Template</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>
            Atur laporan otomatis yang dikirim via email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Belum ada laporan terjadwal. Klik tombol di bawah untuk membuat jadwal baru.
          </p>
          <Button variant="outline">Buat Jadwal Laporan</Button>
        </CardContent>
      </Card>
    </div>
  );
}
