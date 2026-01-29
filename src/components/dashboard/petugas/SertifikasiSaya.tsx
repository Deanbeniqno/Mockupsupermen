import { useState } from 'react';
import { Plus, Download, Trash2, Edit, Upload, X, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../ui/alert-dialog';
import { toast } from 'sonner';

interface Sertifikasi {
  id: number;
  jenis: string;
  tanggalTerbit: string;
  tanggalKadaluarsa: string;
  status: string;
  dokumen: string;
}

const mockData: Sertifikasi[] = [
  { id: 1, jenis: 'Kalibrasi Timbangan', tanggalTerbit: '2024-01-15', tanggalKadaluarsa: '2026-01-15', status: 'Diverifikasi', dokumen: 'sertifikat_001.pdf' },
  { id: 2, jenis: 'Verifikasi Meteran', tanggalTerbit: '2024-03-20', tanggalKadaluarsa: '2026-03-20', status: 'Diverifikasi', dokumen: 'sertifikat_002.pdf' },
  { id: 3, jenis: 'Kalibrasi Alat Ukur', tanggalTerbit: '2024-11-10', tanggalKadaluarsa: '2025-02-10', status: 'Belum', dokumen: 'sertifikat_003.pdf' },
];

export function SertifikasiSaya({ user }: any) {
  const [sertifikasi, setSertifikasi] = useState<Sertifikasi[]>(mockData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    jenis: '',
    tanggalTerbit: '',
    tanggalKadaluarsa: '',
    dokumen: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.jenis) newErrors.jenis = 'Jenis sertifikasi wajib diisi';
    if (!formData.tanggalTerbit) newErrors.tanggalTerbit = 'Tanggal terbit wajib diisi';
    if (!formData.tanggalKadaluarsa) newErrors.tanggalKadaluarsa = 'Tanggal kadaluarsa wajib diisi';
    if (!formData.dokumen) newErrors.dokumen = 'Dokumen wajib diunggah';

    if (formData.tanggalTerbit && formData.tanggalKadaluarsa) {
      if (new Date(formData.tanggalKadaluarsa) <= new Date(formData.tanggalTerbit)) {
        newErrors.tanggalKadaluarsa = 'Tanggal kadaluarsa harus lebih besar dari tanggal terbit';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error('Mohon lengkapi semua field dengan benar');
      return;
    }

    const newSertifikasi: Sertifikasi = {
      id: sertifikasi.length + 1,
      jenis: formData.jenis,
      tanggalTerbit: formData.tanggalTerbit,
      tanggalKadaluarsa: formData.tanggalKadaluarsa,
      status: 'Belum',
      dokumen: formData.dokumen?.name || '',
    };

    setSertifikasi([...sertifikasi, newSertifikasi]);
    setIsAddDialogOpen(false);
    setFormData({
      jenis: '',
      tanggalTerbit: '',
      tanggalKadaluarsa: '',
      dokumen: null,
    });
    toast.success('Sertifikasi berhasil ditambahkan. Menunggu verifikasi dari Verifikator.');
  };

  const handleDelete = (id: number) => {
    setSertifikasi(sertifikasi.filter(s => s.id !== id));
    toast.success('Sertifikasi berhasil dihapus');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('pdf')) {
        setErrors({ ...errors, dokumen: 'Hanya file PDF yang diperbolehkan' });
        return;
      }
      setFormData({ ...formData, dokumen: file });
      setErrors({ ...errors, dokumen: '' });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Diverifikasi': 'bg-green-100 text-green-700',
      'Belum': 'bg-yellow-100 text-yellow-700',
      'Ditolak': 'bg-red-100 text-red-700',
    };
    return variants[status as keyof typeof variants];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Sertifikasi Saya</h2>
          <p className="text-gray-600 mt-1">
            Kelola sertifikasi kompetensi Anda
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 hover:bg-blue-800 gap-2">
              <Plus className="h-4 w-4" />
              Tambah Sertifikasi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Sertifikasi Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="jenis">Jenis Sertifikasi *</Label>
                <Select
                  value={formData.jenis}
                  onValueChange={(value) => {
                    setFormData({ ...formData, jenis: value });
                    setErrors({ ...errors, jenis: '' });
                  }}
                >
                  <SelectTrigger className={errors.jenis ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Pilih jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kalibrasi Timbangan">Kalibrasi Timbangan</SelectItem>
                    <SelectItem value="Verifikasi Meteran">Verifikasi Meteran</SelectItem>
                    <SelectItem value="Kalibrasi Alat Ukur">Kalibrasi Alat Ukur</SelectItem>
                    <SelectItem value="Verifikasi UTTP">Verifikasi UTTP</SelectItem>
                  </SelectContent>
                </Select>
                {errors.jenis && <p className="text-sm text-red-600 mt-1">{errors.jenis}</p>}
              </div>

              <div>
                <Label htmlFor="tanggalTerbit">Tanggal Terbit *</Label>
                <Input
                  id="tanggalTerbit"
                  type="date"
                  value={formData.tanggalTerbit}
                  onChange={(e) => {
                    setFormData({ ...formData, tanggalTerbit: e.target.value });
                    setErrors({ ...errors, tanggalTerbit: '' });
                  }}
                  className={errors.tanggalTerbit ? 'border-red-500' : ''}
                />
                {errors.tanggalTerbit && <p className="text-sm text-red-600 mt-1">{errors.tanggalTerbit}</p>}
              </div>

              <div>
                <Label htmlFor="tanggalKadaluarsa">Tanggal Kadaluarsa *</Label>
                <Input
                  id="tanggalKadaluarsa"
                  type="date"
                  value={formData.tanggalKadaluarsa}
                  onChange={(e) => {
                    setFormData({ ...formData, tanggalKadaluarsa: e.target.value });
                    setErrors({ ...errors, tanggalKadaluarsa: '' });
                  }}
                  className={errors.tanggalKadaluarsa ? 'border-red-500' : ''}
                />
                {errors.tanggalKadaluarsa && <p className="text-sm text-red-600 mt-1">{errors.tanggalKadaluarsa}</p>}
              </div>

              <div>
                <Label htmlFor="dokumen">Upload Dokumen (PDF) *</Label>
                <div className="mt-2">
                  <label
                    htmlFor="dokumen"
                    className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                      errors.dokumen ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {formData.dokumen ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">{formData.dokumen.name}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({ ...formData, dokumen: null });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <Upload className="h-6 w-6 mb-1" />
                        <p className="text-sm">Klik untuk upload PDF</p>
                      </div>
                    )}
                  </label>
                  <input
                    id="dokumen"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </div>
                {errors.dokumen && <p className="text-sm text-red-600 mt-1">{errors.dokumen}</p>}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSubmit} className="flex-1 bg-blue-900 hover:bg-blue-800">
                  Submit
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Batal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Sertifikasi</CardTitle>
          <CardDescription>
            Semua sertifikasi kompetensi yang Anda miliki
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jenis Sertifikasi</TableHead>
                <TableHead>Tanggal Terbit</TableHead>
                <TableHead>Tanggal Kadaluarsa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dokumen</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sertifikasi.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.jenis}</TableCell>
                  <TableCell>{new Date(item.tanggalTerbit).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>{new Date(item.tanggalKadaluarsa).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusBadge(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                            <AlertDialogDescription>
                              Anda yakin ingin menghapus sertifikasi ini? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600 hover:bg-red-700">
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
