import { useState } from 'react';
import { Plus, Edit, UserX, Key, FileUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { toast } from 'sonner';

const mockUsers = [
  { id: 1, nip: '198501012010011001', nama: 'Budi Santoso', role: 'Petugas', email: 'budi@kemendag.go.id', daerah: 'DKI Jakarta', status: 'Aktif', createdAt: '2024-01-15' },
  { id: 2, nip: '198601012011011002', nama: 'Siti Nurhaliza', role: 'Verifikator', email: 'siti@kemendag.go.id', daerah: 'Jawa Barat', status: 'Aktif', createdAt: '2024-02-20' },
  { id: 3, nip: '198701012012011003', nama: 'Ahmad Fauzi', role: 'Daerah', email: 'ahmad@kemendag.go.id', daerah: 'Jawa Tengah', status: 'Nonaktif', createdAt: '2024-03-10' },
];

export function ManajemenUser({ user }: any) {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleResetPassword = (userId: number) => {
    toast.success('Email reset password telah dikirim ke pengguna');
  };

  const handleDeactivate = (userId: number) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'Nonaktif' } : u));
    toast.success('User berhasil dinonaktifkan');
  };

  const handleActivate = (userId: number) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'Aktif' } : u));
    toast.success('User berhasil diaktifkan');
  };

  const filteredUsers = users.filter(u =>
    u.nip.includes(searchTerm) ||
    u.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Manajemen User</h2>
          <p className="text-gray-600 mt-1">
            Kelola akun pengguna sistem SUPERMEN
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileUp className="h-4 w-4" />
            Bulk Import CSV
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-900 hover:bg-blue-800 gap-2">
                <Plus className="h-4 w-4" />
                Tambah User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah User Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>NIP</Label>
                  <Input placeholder="18 digit" />
                </div>
                <div>
                  <Label>Nama Lengkap</Label>
                  <Input placeholder="Nama lengkap" />
                </div>
                <div>
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daerah">User Daerah</SelectItem>
                      <SelectItem value="petugas">Petugas</SelectItem>
                      <SelectItem value="verifikator">Verifikator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@kemendag.go.id" />
                </div>
                <div>
                  <Label>Assign Daerah</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih daerah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                      <SelectItem value="jabar">Jawa Barat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">Tambah User</Button>
                  <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                    Batal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar User</CardTitle>
          <CardDescription>
            Semua pengguna terdaftar di sistem
          </CardDescription>
          <div className="mt-4">
            <Input
              placeholder="Cari NIP, nama, atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIP</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Daerah</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-sm">{user.nip}</TableCell>
                  <TableCell>{user.nama}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>
                  <TableCell>{user.daerah}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={user.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Reset Password"
                        onClick={() => handleResetPassword(user.id)}
                      >
                        <Key className="h-4 w-4" />
                      </Button>
                      {user.status === 'Aktif' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          title="Nonaktifkan"
                          onClick={() => handleDeactivate(user.id)}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600"
                          title="Aktifkan"
                          onClick={() => handleActivate(user.id)}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      )}
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
