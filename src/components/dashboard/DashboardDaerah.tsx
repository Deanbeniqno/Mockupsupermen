import { DashboardDaerahMain } from './daerah/DashboardDaerahMain';
import { InputData } from './daerah/InputData';
import { LaporanDaerah } from './daerah/LaporanDaerah';
import { PengaturanDaerah } from './daerah/PengaturanDaerah';

interface DashboardDaerahProps {
  currentMenu: string;
  user: any;
}

export function DashboardDaerah({ currentMenu, user }: DashboardDaerahProps) {
  switch (currentMenu) {
    case 'dashboard':
      return <DashboardDaerahMain user={user} />;
    case 'input-data':
      return <InputData user={user} />;
    case 'laporan':
      return <LaporanDaerah user={user} />;
    case 'pengaturan':
      return <PengaturanDaerah user={user} />;
    default:
      return <DashboardDaerahMain user={user} />;
  }
}
