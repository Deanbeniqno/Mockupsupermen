import { DashboardAdminMain } from './admin/DashboardAdminMain';
import { ManajemenUser } from './admin/ManajemenUser';
import { KonfigurasiSistem } from './admin/KonfigurasiSistem';
import { SemuaLaporan } from './admin/SemuaLaporan';
import { AuditFull } from './admin/AuditFull';

interface DashboardAdminProps {
  currentMenu: string;
  user: any;
}

export function DashboardAdmin({ currentMenu, user }: DashboardAdminProps) {
  switch (currentMenu) {
    case 'dashboard':
      return <DashboardAdminMain user={user} />;
    case 'users':
      return <ManajemenUser user={user} />;
    case 'config':
      return <KonfigurasiSistem user={user} />;
    case 'laporan':
      return <SemuaLaporan user={user} />;
    case 'audit':
      return <AuditFull user={user} />;
    default:
      return <DashboardAdminMain user={user} />;
  }
}
