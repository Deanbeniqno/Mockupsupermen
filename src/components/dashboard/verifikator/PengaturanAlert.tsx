import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { Switch } from '../../ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Plus, Trash2 } from 'lucide-react';

const mockAlertRules = [
  { id: 1, jenis: 'Kadaluarsa 7 Hari', target: 'Semua Daerah', frekuensi: 'Harian', aktif: true },
  { id: 2, jenis: 'Kadaluarsa 30 Hari', target: 'Jawa Barat', frekuensi: 'Mingguan', aktif: true },
];

export function PengaturanAlert({ user }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Pengaturan Alert</h2>
        <p className="text-gray-600 mt-1">
          Konfigurasi notifikasi massal untuk personel
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alert Rules</CardTitle>
          <CardDescription>
            Atur aturan pengiriman notifikasi otomatis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jenis Alert</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Frekuensi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAlertRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>{rule.jenis}</TableCell>
                  <TableCell>{rule.target}</TableCell>
                  <TableCell>{rule.frekuensi}</TableCell>
                  <TableCell>
                    <Switch checked={rule.aktif} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Alert Rule Baru</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Jenis Alert</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Kadaluarsa 7 Hari</SelectItem>
                <SelectItem value="30days">Kadaluarsa 30 Hari</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Template Email</Label>
            <Textarea
              placeholder="Contoh: {Nama}, sertifikasi Anda akan kadaluarsa pada {Tanggal}"
              rows={4}
            />
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Rule
            </Button>
            <Button variant="outline">Test Kirim</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
