import { useState } from 'react';
import { Bell, CheckCheck, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner';

interface Notifikasi {
  id: number;
  waktu: string;
  jenis: 'Reminder' | 'Status Update' | 'System';
  isi: string;
  dibaca: boolean;
  icon: 'clock' | 'check' | 'alert' | 'x';
}

const mockNotifikasi: Notifikasi[] = [
  { id: 1, waktu: '2025-10-12 09:30', jenis: 'Reminder', isi: 'Sertifikasi "Kalibrasi Alat Ukur" Anda akan kadaluarsa dalam 7 hari', dibaca: false, icon: 'alert' },
  { id: 2, waktu: '2025-10-11 14:15', jenis: 'Status Update', isi: 'Sertifikasi "Kalibrasi Timbangan" telah diverifikasi', dibaca: false, icon: 'check' },
  { id: 3, waktu: '2025-10-10 10:00', jenis: 'System', isi: 'Sistem akan maintenance pada 15 Oktober 2025, 22:00 - 02:00 WIB', dibaca: true, icon: 'clock' },
  { id: 4, waktu: '2025-10-09 16:45', jenis: 'Status Update', isi: 'Sertifikasi "Verifikasi Meteran" sedang dalam proses verifikasi', dibaca: true, icon: 'clock' },
  { id: 5, waktu: '2025-10-08 11:20', jenis: 'Reminder', isi: 'Sertifikasi "Kalibrasi Alat Ukur" Anda akan kadaluarsa dalam 30 hari', dibaca: true, icon: 'alert' },
];

export function NotifikasiPetugas({ user }: any) {
  const [notifikasi, setNotifikasi] = useState<Notifikasi[]>(mockNotifikasi);
  const [filter, setFilter] = useState<'semua' | 'belum'>('semua');

  const unreadCount = notifikasi.filter(n => !n.dibaca).length;

  const handleMarkAsRead = (id: number) => {
    setNotifikasi(notifikasi.map(n => 
      n.id === id ? { ...n, dibaca: true } : n
    ));
    toast.success('Notifikasi ditandai sudah dibaca');
  };

  const handleMarkAllAsRead = () => {
    setNotifikasi(notifikasi.map(n => ({ ...n, dibaca: true })));
    toast.success('Semua notifikasi ditandai sudah dibaca');
  };

  const filteredNotifikasi = filter === 'belum' 
    ? notifikasi.filter(n => !n.dibaca)
    : notifikasi;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'clock':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'check':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'x':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getJenisBadge = (jenis: string) => {
    const variants = {
      'Reminder': 'bg-yellow-100 text-yellow-700',
      'Status Update': 'bg-blue-100 text-blue-700',
      'System': 'bg-gray-100 text-gray-700',
    };
    return variants[jenis as keyof typeof variants];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Notifikasi</h2>
          <p className="text-gray-600 mt-1">
            {unreadCount} notifikasi belum dibaca
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'semua' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('semua')}
          >
            Semua ({notifikasi.length})
          </Button>
          <Button
            variant={filter === 'belum' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('belum')}
          >
            Belum Dibaca ({unreadCount})
          </Button>
        </div>
      </div>

      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="gap-2"
          >
            <CheckCheck className="h-4 w-4" />
            Tandai Semua Dibaca
          </Button>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Timeline Notifikasi</CardTitle>
          <CardDescription>
            Riwayat notifikasi dan pengingat sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifikasi.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Tidak ada notifikasi</p>
              </div>
            ) : (
              filteredNotifikasi.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex gap-4 p-4 rounded-lg border transition-colors ${
                    notif.dibaca 
                      ? 'bg-white border-gray-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notif.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className={getJenisBadge(notif.jenis)}>
                        {notif.jenis}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(notif.waktu).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <p className={`text-sm ${notif.dibaca ? 'text-gray-600' : 'text-gray-900'}`}>
                      {notif.isi}
                    </p>
                    {!notif.dibaca && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="mt-2 h-auto p-0 text-blue-600 hover:text-blue-700"
                      >
                        Tandai sudah dibaca
                      </Button>
                    )}
                  </div>
                  {!notif.dibaca && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
