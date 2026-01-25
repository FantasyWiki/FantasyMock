// Shared league data for leaderboards and league details

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  points: number;
  change: number;
  isCurrentUser: boolean;
}

export interface LeagueInfo {
  totalPlayers: number;
  endDate: string;
  language: string;
  description?: string;
}

// Extended leaderboard data with more players for the full view
export const leaderboardsByLeague: Record<string, LeaderboardPlayer[]> = {
  global: [
    { rank: 1, name: "CryptoGod", points: 3850, change: 12, isCurrentUser: false },
    { rank: 2, name: "WordHunter", points: 3720, change: 5, isCurrentUser: false },
    { rank: 3, name: "BullishBot", points: 3610, change: -3, isCurrentUser: false },
    { rank: 4, name: "DataDragon", points: 2280, change: 8, isCurrentUser: false },
    { rank: 5, name: "TrendMaster", points: 2150, change: -1, isCurrentUser: false },
    { rank: 6, name: "WikiWarrior", points: 2050, change: 4, isCurrentUser: false },
    { rank: 7, name: "QuantumQuest", points: 1980, change: -2, isCurrentUser: false },
    { rank: 8, name: "AlphaTrader", points: 1850, change: 6, isCurrentUser: false },
    { rank: 9, name: "BetaMaster", points: 1720, change: 3, isCurrentUser: false },
    { rank: 10, name: "GammaHunter", points: 1650, change: -4, isCurrentUser: false },
    { rank: 11, name: "DeltaForce", points: 1580, change: 7, isCurrentUser: false },
    { rank: 12, name: "EpsilonX", points: 1490, change: 1, isCurrentUser: false },
    { rank: 13, name: "ZetaPlayer", points: 1420, change: -2, isCurrentUser: false },
    { rank: 14, name: "EtaGamer", points: 1350, change: 5, isCurrentUser: false },
    { rank: 15, name: "ThetaPro", points: 1280, change: -1, isCurrentUser: false },
    { rank: 42, name: "You", points: 890, change: 2, isCurrentUser: true },
    { rank: 43, name: "IotaNewbie", points: 870, change: 8, isCurrentUser: false },
    { rank: 44, name: "KappaKid", points: 850, change: -3, isCurrentUser: false },
    { rank: 45, name: "LambdaLearner", points: 830, change: 4, isCurrentUser: false },
    { rank: 46, name: "MuMaster", points: 810, change: 1, isCurrentUser: false },
  ],
  europe: [
    { rank: 1, name: "EuroTrader", points: 4200, change: 8, isCurrentUser: false },
    { rank: 2, name: "WikiMaster", points: 3950, change: 3, isCurrentUser: false },
    { rank: 3, name: "CryptoKing", points: 2890, change: -2, isCurrentUser: false },
    { rank: 4, name: "DataWizard", points: 2750, change: 6, isCurrentUser: false },
    { rank: 5, name: "BerlinBull", points: 2600, change: 4, isCurrentUser: false },
    { rank: 6, name: "ParisPlayer", points: 2450, change: -1, isCurrentUser: false },
    { rank: 7, name: "RomeMaster", points: 2300, change: 9, isCurrentUser: false },
    { rank: 8, name: "MadridMaven", points: 2150, change: 2, isCurrentUser: false },
    { rank: 9, name: "LondonLegend", points: 2000, change: -3, isCurrentUser: false },
    { rank: 10, name: "AmsterdamAce", points: 1850, change: 5, isCurrentUser: false },
    { rank: 28, name: "You", points: 1100, change: 15, isCurrentUser: true },
    { rank: 29, name: "ViennaVet", points: 1050, change: 3, isCurrentUser: false },
    { rank: 30, name: "PragueProdigy", points: 1000, change: -2, isCurrentUser: false },
  ],
  americas: [
    { rank: 1, name: "AmericaFirst", points: 3600, change: 10, isCurrentUser: false },
    { rank: 2, name: "TechGuru", points: 3400, change: 7, isCurrentUser: false },
    { rank: 3, name: "BlockchainBoss", points: 3200, change: -1, isCurrentUser: false },
    { rank: 4, name: "AIExpert", points: 1950, change: 2, isCurrentUser: false },
    { rank: 5, name: "SiliconStar", points: 1800, change: 5, isCurrentUser: false },
    { rank: 6, name: "NYTrader", points: 1650, change: -2, isCurrentUser: false },
    { rank: 7, name: "LALegend", points: 1500, change: 8, isCurrentUser: false },
    { rank: 8, name: "ChicagoChamp", points: 1350, change: 1, isCurrentUser: false },
    { rank: 35, name: "You", points: 650, change: 4, isCurrentUser: true },
    { rank: 36, name: "TexasTrader", points: 620, change: -1, isCurrentUser: false },
    { rank: 37, name: "FloridaFan", points: 590, change: 3, isCurrentUser: false },
  ],
  asia: [
    { rank: 1, name: "AsiaLeader", points: 4500, change: 18, isCurrentUser: false },
    { rank: 2, name: "TechNinja", points: 4100, change: 9, isCurrentUser: false },
    { rank: 3, name: "CryptoSamurai", points: 3500, change: 5, isCurrentUser: false },
    { rank: 4, name: "DataSensei", points: 3200, change: -3, isCurrentUser: false },
    { rank: 5, name: "TokyoTitan", points: 2900, change: 7, isCurrentUser: false },
    { rank: 6, name: "SeoulStar", points: 2600, change: 4, isCurrentUser: false },
    { rank: 7, name: "ShanghaiShark", points: 2300, change: -2, isCurrentUser: false },
    { rank: 8, name: "SingaporeSage", points: 2000, change: 11, isCurrentUser: false },
    { rank: 18, name: "You", points: 1200, change: 12, isCurrentUser: true },
    { rank: 19, name: "HongKongHero", points: 1150, change: 6, isCurrentUser: false },
    { rank: 20, name: "MumbaiMaster", points: 1100, change: -1, isCurrentUser: false },
  ],
  premier: [
    { rank: 1, name: "ElitePlayer", points: 5200, change: 20, isCurrentUser: false },
    { rank: 2, name: "TopTrader", points: 4900, change: 15, isCurrentUser: false },
    { rank: 3, name: "ChampionX", points: 4600, change: 8, isCurrentUser: false },
    { rank: 4, name: "ProGamer", points: 3900, change: 5, isCurrentUser: false },
    { rank: 5, name: "EliteBoss", points: 3600, change: -2, isCurrentUser: false },
    { rank: 6, name: "PremiumPro", points: 3300, change: 9, isCurrentUser: false },
    { rank: 7, name: "GoldMaster", points: 3000, change: 3, isCurrentUser: false },
    { rank: 8, name: "DiamondDuke", points: 2700, change: -4, isCurrentUser: false },
    { rank: 22, name: "You", points: 1400, change: 10, isCurrentUser: true },
    { rank: 23, name: "PlatinumPlayer", points: 1350, change: 2, isCurrentUser: false },
    { rank: 24, name: "SilverStar", points: 1300, change: -1, isCurrentUser: false },
  ],
  champions: [
    { rank: 1, name: "WorldChamp", points: 6000, change: 25, isCurrentUser: false },
    { rank: 2, name: "LegendaryOne", points: 5200, change: 12, isCurrentUser: false },
    { rank: 3, name: "UltimateWiki", points: 4800, change: 7, isCurrentUser: false },
    { rank: 4, name: "MasterMind", points: 4500, change: 3, isCurrentUser: false },
    { rank: 5, name: "ChampKing", points: 4200, change: -1, isCurrentUser: false },
    { rank: 6, name: "TrophyHunter", points: 3900, change: 8, isCurrentUser: false },
    { rank: 7, name: "GoldenGod", points: 3600, change: 4, isCurrentUser: false },
    { rank: 8, name: "DiamondDragon", points: 3300, change: -2, isCurrentUser: false },
    { rank: 12, name: "You", points: 2500, change: 18, isCurrentUser: true },
    { rank: 13, name: "PlatinumPhoenix", points: 2400, change: 5, isCurrentUser: false },
    { rank: 14, name: "SilverSerpent", points: 2300, change: -3, isCurrentUser: false },
  ],
};

export const leagueInfo: Record<string, LeagueInfo> = {
  global: { 
    totalPlayers: 523, 
    endDate: "Jan 15, 2026", 
    language: "All Languages",
    description: "The ultimate global competition featuring articles from all Wikipedia languages. Compete against the best players worldwide."
  },
  europe: { 
    totalPlayers: 312, 
    endDate: "Jan 20, 2026", 
    language: "European Languages",
    description: "European league featuring articles from major European Wikipedia editions including English, German, French, Spanish, Italian, and more."
  },
  americas: { 
    totalPlayers: 245, 
    endDate: "Jan 18, 2026", 
    language: "English/Spanish",
    description: "Americas league covering North and South America with articles primarily from English and Spanish Wikipedia editions."
  },
  asia: { 
    totalPlayers: 489, 
    endDate: "Jan 22, 2026", 
    language: "Asian Languages",
    description: "Asia-Pacific league featuring articles from Chinese, Japanese, Korean, Hindi, and other Asian Wikipedia editions."
  },
  premier: { 
    totalPlayers: 128, 
    endDate: "Feb 1, 2026", 
    language: "English",
    description: "Elite English-only league for experienced players. Higher stakes, bigger rewards, and fierce competition."
  },
  champions: { 
    totalPlayers: 64, 
    endDate: "Feb 15, 2026", 
    language: "All Languages",
    description: "The most prestigious league. Only top performers from other leagues are invited to compete here."
  },
};

// Helper to get players around the current user's position
export function getPlayersAroundUser(leagueId: string, range: number = 2): LeaderboardPlayer[] {
  const players = leaderboardsByLeague[leagueId] || leaderboardsByLeague.global;
  const userIndex = players.findIndex(p => p.isCurrentUser);
  
  if (userIndex === -1) return players.slice(0, 5);
  
  const start = Math.max(0, userIndex - range);
  const end = Math.min(players.length, userIndex + range + 1);
  
  return players.slice(start, end);
}

// Helper to get top N players
export function getTopPlayers(leagueId: string, count: number = 10): LeaderboardPlayer[] {
  const players = leaderboardsByLeague[leagueId] || leaderboardsByLeague.global;
  return players.filter(p => p.rank <= count).sort((a, b) => a.rank - b.rank);
}
