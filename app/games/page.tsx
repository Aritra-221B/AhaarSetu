import { Metadata } from 'next'
import ChordMasterGame from '@/components/Game/ChordMasterGame';

export const metadata: Metadata = {
    title: "Chordscraft's games Page",
    description: ""
  };

  export default function GamesPage() {
    return (
      <div>
            <ChordMasterGame />
      </div>
    );
  }
