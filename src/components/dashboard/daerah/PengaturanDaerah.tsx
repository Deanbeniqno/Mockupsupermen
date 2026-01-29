import { useState } from 'react';
import { User, Lock, Bell, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Switch } from '../../ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog';
import { toast } from 'sonner';

export function PengaturanDaerah({ user }: any) {
  const [profileData, setProfileData] = useState({
    nama: user.name,
    jabatan: user.jabatan,
    email: user.email,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailReminder: true,
    whatsappNotif: false,
    browserNotif: true,
  });

  const handleUpdateProfile = () => {
    toast.success('Profil berhasil diperbarui!');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Password baru dan konfirmasi tidak cocok');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }
    toast.success('Password berhasil diubah!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleDeleteAccount = () => {
    toast.success('Permintaan hapus akun akan diproses oleh admin');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Pengaturan</h2>
        <p className="text-gray-600 mt-1">
          Kelola profil dan preferensi akun Anda
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profil Pengguna
          </CardTitle>
          <CardDescription>
            Informasi dasar akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input
              id="nama"
              value={profileData.nama}
              onChange={(e) => setProfileData({ ...profileData, nama: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="jabatan">Jabatan</Label>
            <Input
              id="jabatan"
              value={profileData.jabatan}
              disabled
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">
              Field ini dikunci oleh sistem. Hubungi admin untuk perubahan.
            </p>
          </div>

          <div>
            <Label htmlFor="email">Email (.go.id)</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
          </div>

          <div>
            <Label>NIP</Label>
            <Input
              value={user.nip}
              disabled
              className="bg-gray-50 font-mono"
            />
          </div>

          <Button onClick={handleUpdateProfile} className="bg-blue-900 hover:bg-blue-800">
            Update Profil
          </Button>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Keamanan Password
          </CardTitle>
          <CardDescription>
            Ubah password akun Anda secara berkala
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Password Saat Ini</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="newPassword">Password Baru</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimal 6 karakter, kombinasi huruf dan angka
            </p>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            />
          </div>

          <Button onClick={handleChangePassword} className="bg-blue-900 hover:bg-blue-800">
            Ubah Password
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifikasi
          </CardTitle>
          <CardDescription>
            Atur preferensi notifikasi sistem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailReminder">Email Reminder Kadaluarsa</Label>
              <p className="text-sm text-gray-500">
                Terima pengingat email 7 hari sebelum sertifikasi kadaluarsa
              </p>
            </div>
            <Switch
              id="emailReminder"
              checked={notifications.emailReminder}
              onCheckedChange={(checked) => setNotifications({ ...notifications, emailReminder: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="whatsappNotif">Notifikasi WhatsApp</Label>
              <p className="text-sm text-gray-500">
                Terima notifikasi melalui WhatsApp (Opsional)
              </p>
            </div>
            <Switch
              id="whatsappNotif"
              checked={notifications.whatsappNotif}
              onCheckedChange={(checked) => setNotifications({ ...notifications, whatsappNotif: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="browserNotif">Notifikasi Browser</Label>
              <p className="text-sm text-gray-500">
                Tampilkan notifikasi di browser saat ada update
              </p>
            </div>
            <Switch
              id="browserNotif"
              checked={notifications.browserNotif}
              onCheckedChange={(checked) => setNotifications({ ...notifications, browserNotif: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Zona Bahaya
          </CardTitle>
          <CardDescription>
            Tindakan permanen yang tidak dapat dibatalkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Hapus Akun
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Hapus Akun</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini akan menghapus akun Anda secara permanen. 
                  Semua data akan dihapus dan tidak dapat dipulihkan. 
                  Anda yakin ingin melanjutkan?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                  Ya, Hapus Akun
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
