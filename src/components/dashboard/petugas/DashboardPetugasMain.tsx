import { FileCheck, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Alert, AlertDescription } from '../../ui/alert';

interface SertifikasiData {
  id: number;
  jenis: string;
  tanggalTerbit: string;
  tanggalKadaluarsa: string;
  statusVerifikasi: 'Diverifikasi' | 'Belum' | 'Ditolak';
}

const mockSertifikasi: SertifikasiData[] = [
  { id: 1, jenis: 'Kalibrasi Timbangan', tanggalTerbit: '2024-01-15', tanggalKadaluarsa: '2026-01-15', statusVerifikasi: 'Diverifikasi' },
  { id: 2, jenis: 'Verifikasi Meteran', tanggalTerbit: '2024-03-20', tanggalKadaluarsa: '2026-03-20', statusVerifikasi: 'Diverifikasi' },
  { id: 3, jenis: 'Kalibrasi Alat Ukur', tanggalTerbit: '2024-11-10', tanggalKadaluarsa: '2025-02-10', statusVerifikasi: 'Belum' },
];

export function DashboardPetugasMain({ user }: any) {
  const aktivSertifikasi = mockSertifikasi.filter(s => s.statusVerifikasi === 'Diverifikasi');
  const mendekatKadaluarsa = mockSertifikasi.filter(s => {
    const daysUntilExpiry = Math.floor((new Date(s.tanggalKadaluarsa).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'Diverifikasi': 'bg-green-100 text-green-700',
      'Belum': 'bg-yellow-100 text-yellow-700',
      'Ditolak': 'bg-red-100 text-red-700',
    };
    return variants[status as keyof typeof variants];
  };

  const getDaysUntilExpiry = (tanggalKadaluarsa: string) => {
    return Math.floor((new Date(tanggalKadaluarsa).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Dashboard Pribadi</h2>
        <p className="text-gray-600 mt-1">
          Overview status sertifikasi Anda - {user.name}
        </p>
      </div>

      {/* Alert Banner */}
      {mendekatKadaluarsa.length > 0 && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Perhatian!</strong> Anda memiliki {mendekatKadaluarsa.length} sertifikasi yang akan kadaluarsa dalam 90 hari.
            Segera lakukan perpanjangan.
          </AlertDescription>
        </Alert>
      )}

      {/* Status Card */}
      <Card className={`border-2 ${aktivSertifikasi.length > 0 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${aktivSertifikasi.length > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {aktivSertifikasi.length > 0 ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <AlertCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <div>
              <h3 className={aktivSertifikasi.length > 0 ? 'text-green-900' : 'text-red-900'}>
                Status Saat Ini: {aktivSertifikasi.length > 0 ? 'Aktif' : 'Tidak Aktif'}
              </h3>
              <p className={`text-sm ${aktivSertifikasi.length > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {aktivSertifikasi.length > 0 
                  ? `Anda memiliki ${aktivSertifikasi.length} sertifikasi aktif yang terverifikasi`
                  : 'Anda tidak memiliki sertifikasi aktif. Segera ajukan sertifikasi baru.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Total Sertifikasi
            </CardTitle>
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileCheck className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">{mockSertifikasi.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Sertifikasi yang Anda miliki
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
            <div className="text-2xl text-gray-900">{aktivSertifikasi.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Sertifikasi aktif terverifikasi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">
              Akan Kadaluarsa
            </CardTitle>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">{mendekatKadaluarsa.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Dalam 90 hari ke depan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sertifikasi Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Sertifikasi Saya</CardTitle>
          <CardDescription>
            Timeline dan status semua sertifikasi Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jenis Sertifikasi</TableHead>
                <TableHead>Tanggal Terbit</TableHead>
                <TableHead>Tanggal Kadaluarsa</TableHead>
                <TableHead>Sisa Hari</TableHead>
                <TableHead>Status Verifikasi</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSertifikasi.map((sertifikasi) => {
                const daysLeft = getDaysUntilExpiry(sertifikasi.tanggalKadaluarsa);
                return (
                  <TableRow key={sertifikasi.id}>
                    <TableCell>{sertifikasi.jenis}</TableCell>
                    <TableCell>{new Date(sertifikasi.tanggalTerbit).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell>{new Date(sertifikasi.tanggalKadaluarsa).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell>
                      <span className={daysLeft < 90 ? 'text-yellow-600' : 'text-gray-600'}>
                        {daysLeft} hari
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusBadge(sertifikasi.statusVerifikasi)}>
                        {sertifikasi.statusVerifikasi}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">Detail</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detail Sertifikasi</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm text-gray-600">Jenis Sertifikasi</label>
                              <p>{sertifikasi.jenis}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-600">Tanggal Terbit</label>
                              <p>{new Date(sertifikasi.tanggalTerbit).toLocaleDateString('id-ID')}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-600">Tanggal Kadaluarsa</label>
                              <p>{new Date(sertifikasi.tanggalKadaluarsa).toLocaleDateString('id-ID')}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-600">Status Verifikasi</label>
                              <div className="mt-1">
                                <Badge variant="secondary" className={getStatusBadge(sertifikasi.statusVerifikasi)}>
                                  {sertifikasi.statusVerifikasi}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm text-gray-600">Sisa Waktu</label>
                              <p>{daysLeft} hari hingga kadaluarsa</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline Kadaluarsa</CardTitle>
          <CardDescription>
            Visualisasi masa berlaku sertifikasi Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSertifikasi.map((sertifikasi) => {
              const totalDays = Math.floor((new Date(sertifikasi.tanggalKadaluarsa).getTime() - new Date(sertifikasi.tanggalTerbit).getTime()) / (1000 * 60 * 60 * 24));
              const daysLeft = getDaysUntilExpiry(sertifikasi.tanggalKadaluarsa);
              const percentage = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));
              
              return (
                <div key={sertifikasi.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{sertifikasi.jenis}</span>
                    <span className={daysLeft < 90 ? 'text-yellow-600' : 'text-gray-600'}>
                      {daysLeft} hari tersisa
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage > 50 ? 'bg-green-500' : 
                        percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
