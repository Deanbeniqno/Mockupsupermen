import { DashboardVerifikatorMain } from './verifikator/DashboardVerifikatorMain';
import { VerifikasiPending } from './verifikator/VerifikasiPending';
import { AuditLog } from './verifikator/AuditLog';
import { LaporanNasional } from './verifikator/LaporanNasional';
import { PengaturanAlert } from './verifikator/PengaturanAlert';

interface DashboardVerifikatorProps {
  currentMenu: string;
  user: any;
}

export function DashboardVerifikator({ currentMenu, user }: DashboardVerifikatorProps) {
  switch (currentMenu) {
    case 'dashboard':
      return <DashboardVerifikatorMain user={user} />;
    case 'verifikasi':
      return <VerifikasiPending user={user} />;
    case 'audit':
      return <AuditLog user={user} />;
    case 'laporan':
      return <LaporanNasional user={user} />;
    case 'alert':
      return <PengaturanAlert user={user} />;
    default:
      return <DashboardVerifikatorMain user={user} />;
  }
}
