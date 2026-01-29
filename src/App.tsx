import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { RegistrationForm } from './components/RegistrationForm';
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/DashboardLayout';
import { Toaster } from './components/ui/sonner';

type Page = 'landing' | 'registration' | 'login' | 'dashboard';
type UserRole = 'daerah' | 'petugas' | 'verifikator' | 'admin';

interface User {
  name: string;
  email: string;
  nip: string;
  jabatan: string;
  role: UserRole;
  daerah?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleRegistrationSubmit = (data: User) => {
    setPendingVerification(true);
    setUser(data);
    setTimeout(() => {
      setCurrentPage('landing');
    }, 2000);
  };

  const handleLogin = (email: string, password: string) => {
    if (pendingVerification && user?.email === email) {
      alert('Akun Anda masih menunggu verifikasi dari Admin/Verifikator.');
      return;
    }
    
    // Mock login with different roles for demo
    let mockUser: User;
    
    if (email.includes('admin')) {
      mockUser = { 
        name: 'Admin Pusat', 
        email, 
        nip: '198501012010011001',
        jabatan: 'Administrator Pusat',
        role: 'admin'
      };
    } else if (email.includes('verifikator')) {
      mockUser = { 
        name: 'Verifikator Nasional', 
        email, 
        nip: '198601012011011002',
        jabatan: 'Verifikator',
        role: 'verifikator'
      };
    } else if (email.includes('petugas')) {
      mockUser = { 
        name: 'Petugas Metrologi', 
        email, 
        nip: '198701012012011003',
        jabatan: 'Petugas Kalibrasi',
        role: 'petugas'
      };
    } else {
      mockUser = { 
        name: 'Staff Dinas Daerah', 
        email, 
        nip: '198801012013011004',
        jabatan: 'Kepala Seksi',
        role: 'daerah',
        daerah: 'DKI Jakarta'
      };
    }
    
    setUser(mockUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPendingVerification(false);
    setCurrentPage('landing');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {currentPage === 'landing' && (
          <LandingPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'registration' && (
          <RegistrationForm 
            onSubmit={handleRegistrationSubmit}
            onBack={() => handleNavigate('landing')}
          />
        )}
        {currentPage === 'login' && (
          <LoginPage 
            onLogin={handleLogin}
            onBack={() => handleNavigate('landing')}
          />
        )}
        {currentPage === 'dashboard' && user && (
          <DashboardLayout 
            user={user}
            onLogout={handleLogout}
          />
        )}
      </div>
      <Toaster />
    </>
  );
}
