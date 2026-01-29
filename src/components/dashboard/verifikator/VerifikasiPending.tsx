import { useState } from 'react';
import { CheckCircle, XCircle, Eye, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { toast } from 'sonner';

const mockPendingData = [
  { id: 1, nip: '199001012015011006', nama: 'Rina Wati', jenisSertifikasi: 'Kalibrasi Timbangan', daerah: 'DKI Jakarta', dokumen: 'sertifikat_006.pdf', tanggalAjuan: '2025-10-10' },
  { id: 2, nip: '199101012016011007', nama: 'Agus Salim', jenisSertifikasi: 'Verifikasi Meteran', daerah: 'Jawa Barat', dokumen: 'sertifikat_007.pdf', tanggalAjuan: '2025-10-09' },
  { id: 3, nip: '199201012017011008', nama: 'Linda Sari', jenisSertifikasi: 'Kalibrasi Alat Ukur', daerah: 'Jawa Tengah', dokumen: 'sertifikat_008.pdf', tanggalAjuan: '2025-10-08' },
];

export function VerifikasiPending({ user }: any) {
  const [pendingData, setPendingData] = useState(mockPendingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedItemForReject, setSelectedItemForReject] = useState<number | null>(null);

  const handleApprove = (id: number) => {
    setPendingData(pendingData.filter(item => item.id !== id));
    toast.success('Sertifikasi berhasil diverifikasi. Notifikasi telah dikirim ke petugas.');
  };

  const handleBulkApprove = () => {
    setPendingData(pendingData.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    toast.success(`${selectedItems.length} sertifikasi berhasil diverifikasi.`);
  };

  const handleReject = () => {
    if (!rejectReason) {
      toast.error('Mohon isi alasan penolakan');
      return;
    }
    if (selectedItemForReject) {
      setPendingData(pendingData.filter(item => item.id !== selectedItemForReject));
      toast.success('Sertifikasi ditolak. Email penolakan telah dikirim.');
      setIsRejectDialogOpen(false);
      setRejectReason('');
      setSelectedItemForReject(null);
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredData = pendingData.filter(item =>
    item.nip.includes(searchTerm) ||
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.daerah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Verifikasi Pending</h2>
          <p className="text-gray-600 mt-1">
            {pendingData.length} permintaan verifikasi menunggu approval
          </p>
        </div>
        {selectedItems.length > 0 && (
          <Button onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700 gap-2">
            <CheckCircle className="h-4 w-4" />
            Approve {selectedItems.length} Item
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Permintaan Verifikasi</CardTitle>
          <CardDescription>
            Review dan verifikasi sertifikasi personel
          </CardDescription>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari NIP, nama, atau daerah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredData.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                  />
                </TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jenis Sertifikasi</TableHead>
                <TableHead>Daerah</TableHead>
                <TableHead>Tanggal Ajuan</TableHead>
                <TableHead>Dokumen</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                    Tidak ada permintaan verifikasi pending
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.nip}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.jenisSertifikasi}</TableCell>
                    <TableCell>{item.daerah}</TableCell>
                    <TableCell>{new Date(item.tanggalAjuan).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(item.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedItemForReject(item.id);
                            setIsRejectDialogOpen(true);
                          }}
                          size="sm"
                          variant="destructive"
                          className="gap-2"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alasan Penolakan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Mohon berikan alasan penolakan yang jelas kepada petugas
              </label>
              <Textarea
                placeholder="Contoh: Dokumen tidak jelas, tanggal tidak sesuai, dll..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleReject} variant="destructive" className="flex-1">
                Kirim Penolakan
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsRejectDialogOpen(false);
                  setRejectReason('');
                  setSelectedItemForReject(null);
                }}
                className="flex-1"
              >
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
