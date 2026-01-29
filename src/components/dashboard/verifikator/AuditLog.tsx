import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Button } from '../../ui/button';
import { FileDown } from 'lucide-react';

const mockAuditData = [
  { id: 1, personelNip: '198501012010011001', aksi: 'Create Sertifikasi', waktu: '2025-10-12 09:30:15', oldValues: '-', newValues: '{"jenis":"Kalibrasi"}', pelaku: 'Petugas' },
  { id: 2, personelNip: '198601012011011002', aksi: 'Login', waktu: '2025-10-12 08:15:22', oldValues: '-', newValues: '-', pelaku: 'Petugas' },
  { id: 3, personelNip: '198701012012011003', aksi: 'Update Status', waktu: '2025-10-11 16:45:10', oldValues: '{"status":"Pending"}', newValues: '{"status":"Diverifikasi"}', pelaku: 'Verifikator' },
];

export function AuditLog({ user }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Audit Log</h2>
        <p className="text-gray-600 mt-1">
          Riwayat aktivitas sistem nasional
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Log Aktivitas</CardTitle>
              <CardDescription>
                Tracking semua aktivitas personel dan verifikator
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" />
              Export Log
            </Button>
          </div>
          <div className="flex gap-4 mt-4">
            <Input placeholder="Cari NIP atau aksi..." className="max-w-sm" />
            <Select defaultValue="semua">
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
                <TableHead>NIP Personel</TableHead>
                <TableHead>Aksi</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Role Pelaku</TableHead>
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
                  <TableCell>{log.waktu}</TableCell>
                  <TableCell>{log.pelaku}</TableCell>
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
