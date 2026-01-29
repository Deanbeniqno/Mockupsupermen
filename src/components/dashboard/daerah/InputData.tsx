import { useState } from 'react';
import { ArrowLeft, Upload, X, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { toast } from 'sonner';

export function InputData({ user }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nip: '',
    nama: '',
    jabatan: '',
    email: '',
    jenisSertifikasi: '',
    tanggalTerbit: '',
    tanggalKadaluarsa: '',
    dokumen: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateNIP = (nip: string) => {
    const nipRegex = /^\d{18}$/;
    return nipRegex.test(nip);
  };

  const validateEmail = (email: string) => {
    return email.endsWith('.go.id');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nip) {
      newErrors.nip = 'NIP wajib diisi';
    } else if (!validateNIP(formData.nip)) {
      newErrors.nip = 'NIP harus 18 digit angka';
    }

    if (!formData.nama) newErrors.nama = 'Nama wajib diisi';
    if (!formData.jabatan) newErrors.jabatan = 'Jabatan wajib diisi';
    
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email harus menggunakan domain .go.id';
    }

    if (!formData.jenisSertifikasi) newErrors.jenisSertifikasi = 'Jenis sertifikasi wajib diisi';
    if (!formData.tanggalTerbit) newErrors.tanggalTerbit = 'Tanggal terbit wajib diisi';
    if (!formData.tanggalKadaluarsa) newErrors.tanggalKadaluarsa = 'Tanggal kadaluarsa wajib diisi';

    if (formData.tanggalTerbit && formData.tanggalKadaluarsa) {
      if (new Date(formData.tanggalKadaluarsa) <= new Date(formData.tanggalTerbit)) {
        newErrors.tanggalKadaluarsa = 'Tanggal kadaluarsa harus lebih besar dari tanggal terbit';
      }
    }

    if (!formData.dokumen) newErrors.dokumen = 'Dokumen sertifikasi wajib diunggah';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Mohon lengkapi semua field dengan benar');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Data berhasil disimpan!');
      
      // Reset form
      setFormData({
        nip: '',
        nama: '',
        jabatan: '',
        email: '',
        jenisSertifikasi: '',
        tanggalTerbit: '',
        tanggalKadaluarsa: '',
        dokumen: null,
      });
      setErrors({});
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, dokumen: 'Ukuran file maksimal 5MB' });
        return;
      }
      setFormData({ ...formData, dokumen: file });
      setErrors({ ...errors, dokumen: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Input Data Personel</h2>
        <p className="text-gray-600 mt-1">
          Tambah atau edit data personel metrologi daerah
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form Data Personel & Sertifikasi</CardTitle>
          <CardDescription>
            Lengkapi semua field yang wajib diisi (*)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Data Personel */}
            <div className="space-y-4">
              <h3 className="text-gray-900">Data Personel</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nip">NIP *</Label>
                  <Input
                    id="nip"
                    placeholder="18 digit angka"
                    value={formData.nip}
                    onChange={(e) => {
                      setFormData({ ...formData, nip: e.target.value });
                      setErrors({ ...errors, nip: '' });
                    }}
                    className={errors.nip ? 'border-red-500' : ''}
                    maxLength={18}
                  />
                  {errors.nip && (
                    <p className="text-sm text-red-600 mt-1">{errors.nip}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="nama">Nama Lengkap *</Label>
                  <Input
                    id="nama"
                    placeholder="Nama lengkap personel"
                    value={formData.nama}
                    onChange={(e) => {
                      setFormData({ ...formData, nama: e.target.value });
                      setErrors({ ...errors, nama: '' });
                    }}
                    className={errors.nama ? 'border-red-500' : ''}
                  />
                  {errors.nama && (
                    <p className="text-sm text-red-600 mt-1">{errors.nama}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="jabatan">Jabatan *</Label>
                  <Select
                    value={formData.jabatan}
                    onValueChange={(value) => {
                      setFormData({ ...formData, jabatan: value });
                      setErrors({ ...errors, jabatan: '' });
                    }}
                  >
                    <SelectTrigger className={errors.jabatan ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Pilih jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petugas-kalibrasi">Petugas Kalibrasi</SelectItem>
                      <SelectItem value="pengawas">Pengawas</SelectItem>
                      <SelectItem value="verifikator">Verifikator</SelectItem>
                      <SelectItem value="kepala-seksi">Kepala Seksi</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.jabatan && (
                    <p className="text-sm text-red-600 mt-1">{errors.jabatan}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email (.go.id) *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@instansi.go.id"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: '' });
                    }}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Data Sertifikasi */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="text-gray-900">Data Sertifikasi</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="jenisSertifikasi">Jenis Sertifikasi *</Label>
                  <Select
                    value={formData.jenisSertifikasi}
                    onValueChange={(value) => {
                      setFormData({ ...formData, jenisSertifikasi: value });
                      setErrors({ ...errors, jenisSertifikasi: '' });
                    }}
                  >
                    <SelectTrigger className={errors.jenisSertifikasi ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Pilih jenis sertifikasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kalibrasi-timbangan">Kalibrasi Timbangan</SelectItem>
                      <SelectItem value="verifikasi-meteran">Verifikasi Meteran</SelectItem>
                      <SelectItem value="kalibrasi-alat-ukur">Kalibrasi Alat Ukur</SelectItem>
                      <SelectItem value="verifikasi-uttp">Verifikasi UTTP</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.jenisSertifikasi && (
                    <p className="text-sm text-red-600 mt-1">{errors.jenisSertifikasi}</p>
                  )}
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
                  {errors.tanggalTerbit && (
                    <p className="text-sm text-red-600 mt-1">{errors.tanggalTerbit}</p>
                  )}
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
                  {errors.tanggalKadaluarsa && (
                    <p className="text-sm text-red-600 mt-1">{errors.tanggalKadaluarsa}</p>
                  )}
                </div>
              </div>

              {/* Upload Dokumen */}
              <div>
                <Label htmlFor="dokumen">Upload Dokumen Sertifikasi *</Label>
                <div className="mt-2">
                  <label
                    htmlFor="dokumen"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
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
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Upload className="h-8 w-8 mb-2" />
                        <p className="text-sm">Klik untuk upload file</p>
                        <p className="text-xs">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    )}
                  </label>
                  <input
                    id="dokumen"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>
                {errors.dokumen && (
                  <p className="text-sm text-red-600 mt-1">{errors.dokumen}</p>
                )}
              </div>
            </div>

            {/* Preview Data */}
            {formData.nama && formData.nip && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm text-blue-900 mb-2">Preview Data</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">NIP:</span>
                    <span className="ml-2 font-mono">{formData.nip}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Nama:</span>
                    <span className="ml-2">{formData.nama}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Menyimpan...
                  </>
                ) : (
                  'Simpan Data'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    nip: '',
                    nama: '',
                    jabatan: '',
                    email: '',
                    jenisSertifikasi: '',
                    tanggalTerbit: '',
                    tanggalKadaluarsa: '',
                    dokumen: null,
                  });
                  setErrors({});
                }}
              >
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
