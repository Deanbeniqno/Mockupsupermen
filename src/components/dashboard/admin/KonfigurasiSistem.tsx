import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Save, TestTube } from 'lucide-react';
import { toast } from 'sonner';

const mockConfig = [
  { key: 'SESSION_EXPIRE', value: '30 menit', editable: true },
  { key: 'MAX_LOGIN_ATTEMPTS', value: '5', editable: true },
  { key: 'BACKUP_SCHEDULE', value: 'Daily 02:00', editable: true },
  { key: 'RATE_LIMIT', value: '100 req/jam', editable: true },
];

export function KonfigurasiSistem({ user }: any) {
  const handleApplyChanges = () => {
    toast.success('Konfigurasi berhasil diperbarui. Service akan restart.');
  };

  const handleTestEmail = () => {
    toast.success('Test email domain berhasil dikirim');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Konfigurasi Sistem</h2>
        <p className="text-gray-600 mt-1">
          Pengaturan global aplikasi SUPERMEN
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Domain Email</CardTitle>
          <CardDescription>
            Daftar domain email yang diizinkan untuk registrasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Allowed Domains</Label>
            <Input defaultValue=".go.id" />
            <p className="text-xs text-gray-500 mt-1">
              Pisahkan dengan koma untuk multiple domains
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleTestEmail} variant="outline" className="gap-2">
              <TestTube className="h-4 w-4" />
              Test Email Domain
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Backup Schedule</CardTitle>
          <CardDescription>
            Atur jadwal backup otomatis database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Frekuensi</Label>
              <Input defaultValue="Daily" />
            </div>
            <div>
              <Label>Waktu (WIB)</Label>
              <Input type="time" defaultValue="02:00" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>
            Parameter konfigurasi global sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockConfig.map((config, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{config.key}</TableCell>
                  <TableCell>
                    {config.editable ? (
                      <Input defaultValue={config.value} className="max-w-xs" />
                    ) : (
                      <span>{config.value}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {config.editable && (
                      <Button variant="ghost" size="sm">Edit</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Default</Button>
        <Button onClick={handleApplyChanges} className="gap-2 bg-blue-900 hover:bg-blue-800">
          <Save className="h-4 w-4" />
          Apply Changes
        </Button>
      </div>
    </div>
  );
}
