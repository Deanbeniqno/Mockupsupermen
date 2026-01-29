import { DashboardPetugasMain } from './petugas/DashboardPetugasMain';
import { SertifikasiSaya } from './petugas/SertifikasiSaya';
import { NotifikasiPetugas } from './petugas/NotifikasiPetugas';

interface DashboardPetugasProps {
  currentMenu: string;
  user: any;
}

export function DashboardPetugas({ currentMenu, user }: DashboardPetugasProps) {
  switch (currentMenu) {
    case 'dashboard':
      return <DashboardPetugasMain user={user} />;
    case 'sertifikasi':
      return <SertifikasiSaya user={user} />;
    case 'notifikasi':
      return <NotifikasiPetugas user={user} />;
    default:
      return <DashboardPetugasMain user={user} />;
  }
}
