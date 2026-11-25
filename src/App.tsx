import { AuditReport } from './components/AuditReport';
import { Level1StaffCheck } from './components/levels/Level1StaffCheck';
import { Level2KitchenAudit } from './components/levels/Level2KitchenAudit';
import { Level3StorageAudit } from './components/levels/Level3StorageAudit';
import { MainMenu } from './components/MainMenu';
import { GameHUD } from './components/ui/GameHUD';
import { LevelRecapModal } from './components/ui/LevelRecapModal';
import { RulebookDrawer } from './components/ui/RulebookDrawer';
import { useGameStore } from './store/useGameStore';

export function App() {
  const currentStage = useGameStore((s) => s.currentStage);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <GameHUD />

      <main>
        {currentStage === 'menu' && <MainMenu />}
        {currentStage === 'level1' && <Level1StaffCheck />}
        {currentStage === 'level2' && <Level2KitchenAudit />}
        {currentStage === 'level3' && <Level3StorageAudit />}
        {currentStage === 'summary' && <AuditReport />}
      </main>

      <RulebookDrawer />
      <LevelRecapModal />
    </div>
  );
}

export default App;
