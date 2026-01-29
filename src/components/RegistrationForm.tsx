import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';

interface RegistrationFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export function RegistrationForm({ onSubmit, onBack }: RegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nip: '',
    nama: '',
    jabatan: '',
    instansi: '',
    provinsi: '',
    email: '',
    telepon: '',
    sertifikat: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const validateEmail = (email: string) => {
    if (!email.endsWith('.go.id')) {
      return 'Email harus menggunakan domain .go.id';
    }
    return '';
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.nip) newErrors.nip = 'NIP wajib diisi';
      if (!formData.nama) newErrors.nama = 'Nama wajib diisi';
      if (!formData.jabatan) newErrors.jabatan = 'Jabatan wajib diisi';
    } else if (currentStep === 2) {
      if (!formData.instansi) newErrors.instansi = 'Instansi wajib diisi';
      if (!formData.provinsi) newErrors.provinsi = 'Provinsi wajib diisi';
    } else if (currentStep === 3) {
      if (!formData.email) {
        newErrors.email = 'Email wajib diisi';
      } else {
        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;
      }
      if (!formData.telepon) newErrors.telepon = 'Telepon wajib diisi';
      if (!formData.sertifikat) newErrors.sertifikat = 'Sertifikat wajib diunggah';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(step)) {
      setSubmitted(true);
      setTimeout(() => {
        onSubmit(formData);
      }, 2000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, sertifikat: e.target.files[0] });
      setErrors({ ...errors, sertifikat: '' });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-green-900 mb-2">Pendaftaran Berhasil!</h3>
          <p className="text-gray-600 mb-6">
            Email verifikasi telah dikirim ke <strong>{formData.email}</strong>. 
            Silakan tunggu approval dari Admin/Verifikator sebelum dapat login.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              Proses verifikasi biasanya memakan waktu 1-3 hari kerja. 
              Anda akan menerima notifikasi email setelah akun disetujui.
            </p>
          </div>
          <Button onClick={onBack} className="w-full bg-blue-900 hover:bg-blue-800">
            Kembali ke Halaman Utama
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <h2 className="text-blue-900 mb-2">Formulir Pendaftaran</h2>
          <p className="text-gray-600">
            Silakan lengkapi data Anda untuk mendaftar sebagai pengguna SUPERMEN
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Langkah {step} dari {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Data Pribadi</h3>
              </div>

              <div>
                <Label htmlFor="nip">NIP *</Label>
                <Input
                  id="nip"
                  placeholder="Masukkan NIP (18 digit)"
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
                  placeholder="Masukkan nama lengkap"
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
                    <SelectItem value="petugas">Petugas Metrologi</SelectItem>
                    <SelectItem value="verifikator">Verifikator</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="kepala">Kepala Bagian</SelectItem>
                  </SelectContent>
                </Select>
                {errors.jabatan && (
                  <p className="text-sm text-red-600 mt-1">{errors.jabatan}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Informasi Instansi</h3>
              </div>

              <div>
                <Label htmlFor="instansi">Instansi *</Label>
                <Input
                  id="instansi"
                  placeholder="Contoh: Dinas Perdagangan Kota Jakarta"
                  value={formData.instansi}
                  onChange={(e) => {
                    setFormData({ ...formData, instansi: e.target.value });
                    setErrors({ ...errors, instansi: '' });
                  }}
                  className={errors.instansi ? 'border-red-500' : ''}
                />
                {errors.instansi && (
                  <p className="text-sm text-red-600 mt-1">{errors.instansi}</p>
                )}
              </div>

              <div>
                <Label htmlFor="provinsi">Provinsi *</Label>
                <Select
                  value={formData.provinsi}
                  onValueChange={(value) => {
                    setFormData({ ...formData, provinsi: value });
                    setErrors({ ...errors, provinsi: '' });
                  }}
                >
                  <SelectTrigger className={errors.provinsi ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Pilih provinsi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dki-jakarta">DKI Jakarta</SelectItem>
                    <SelectItem value="jawa-barat">Jawa Barat</SelectItem>
                    <SelectItem value="jawa-tengah">Jawa Tengah</SelectItem>
                    <SelectItem value="jawa-timur">Jawa Timur</SelectItem>
                    <SelectItem value="banten">Banten</SelectItem>
                    <SelectItem value="sumatra-utara">Sumatera Utara</SelectItem>
                    <SelectItem value="sumatra-barat">Sumatera Barat</SelectItem>
                    <SelectItem value="bali">Bali</SelectItem>
                  </SelectContent>
                </Select>
                {errors.provinsi && (
                  <p className="text-sm text-red-600 mt-1">{errors.provinsi}</p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Kontak & Verifikasi</h3>
              </div>

              <div>
                <Label htmlFor="email">Email Resmi (.go.id) *</Label>
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
                <p className="text-sm text-gray-500 mt-1">
                  Hanya email dengan domain .go.id yang diterima
                </p>
              </div>

              <div>
                <Label htmlFor="telepon">Nomor Telepon *</Label>
                <Input
                  id="telepon"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={formData.telepon}
                  onChange={(e) => {
                    setFormData({ ...formData, telepon: e.target.value });
                    setErrors({ ...errors, telepon: '' });
                  }}
                  className={errors.telepon ? 'border-red-500' : ''}
                />
                {errors.telepon && (
                  <p className="text-sm text-red-600 mt-1">{errors.telepon}</p>
                )}
              </div>

              <div>
                <Label htmlFor="sertifikat">Upload Sertifikat Kompetensi *</Label>
                <div className="mt-2">
                  <label 
                    htmlFor="sertifikat"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                      errors.sertifikat ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {formData.sertifikat ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm">{formData.sertifikat.name}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({ ...formData, sertifikat: null });
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
                    id="sertifikat"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>
                {errors.sertifikat && (
                  <p className="text-sm text-red-600 mt-1">{errors.sertifikat}</p>
                )}
              </div>

              <Alert>
                <AlertDescription>
                  Dengan mendaftar, Anda menyetujui bahwa data akan diverifikasi oleh 
                  Admin/Verifikator sebelum akun dapat diaktifkan.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Sebelumnya
            </Button>
            
            {step < totalSteps ? (
              <Button 
                onClick={handleNext}
                className="bg-blue-900 hover:bg-blue-800"
              >
                Selanjutnya
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-blue-900 hover:bg-blue-800"
              >
                Submit Pendaftaran
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
