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

// Market articles per league
export interface MarketArticle {
  id: number;
  title: string;
  slug: string;
  yesterdayViews: number;
  weekViews: number;
  monthViews: number;
  yearViews: number;
  owner: { name: string; teamName: string } | null;
  expiresAt: Date | null;
}

const owned = (name: string, team: string, days: number) => ({
  owner: { name, teamName: team },
  expiresAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
});
const free = { owner: null, expiresAt: null };

export const marketArticlesByLeague: Record<string, MarketArticle[]> = {
  global: [
    { id: 1, title: "Bitcoin", slug: "Bitcoin", yesterdayViews: 4800, weekViews: 35000, monthViews: 125000, yearViews: 1500000, ...free },
    { id: 2, title: "Ethereum", slug: "Ethereum", yesterdayViews: 3200, weekViews: 22000, monthViews: 95000, yearViews: 1100000, ...free },
    { id: 3, title: "Artificial Intelligence", slug: "Artificial_intelligence", yesterdayViews: 11000, weekViews: 75000, monthViews: 250000, yearViews: 3200000, ...owned("CryptoKing42", "Tech Titans", 3) },
    { id: 4, title: "Machine Learning", slug: "Machine_learning", yesterdayViews: 2600, weekViews: 18000, monthViews: 80000, yearViews: 960000, ...free },
    { id: 5, title: "Blockchain", slug: "Blockchain", yesterdayViews: 4200, weekViews: 30000, monthViews: 110000, yearViews: 1300000, ...owned("WikiMaster", "Knowledge Base", 5) },
    { id: 6, title: "Cryptocurrency", slug: "Cryptocurrency", yesterdayViews: 6500, weekViews: 45000, monthViews: 180000, yearViews: 2100000, ...free },
    { id: 7, title: "Satoshi Nakamoto", slug: "Satoshi_Nakamoto", yesterdayViews: 1700, weekViews: 12000, monthViews: 45000, yearViews: 540000, ...free },
    { id: 8, title: "Cloud Computing", slug: "Cloud_computing", yesterdayViews: 4600, weekViews: 32000, monthViews: 130000, yearViews: 1560000, ...free },
    { id: 9, title: "NFT", slug: "Non-fungible_token", yesterdayViews: 2100, weekViews: 15000, monthViews: 65000, yearViews: 780000, ...owned("ArtCollector", "Digital Dreams", 2) },
    { id: 10, title: "Smart Contract", slug: "Smart_contract", yesterdayViews: 2000, weekViews: 14000, monthViews: 55000, yearViews: 660000, ...free },
    { id: 11, title: "Deep Learning", slug: "Deep_learning", yesterdayViews: 3800, weekViews: 26000, monthViews: 105000, yearViews: 1260000, ...free },
    { id: 12, title: "Internet of Things", slug: "Internet_of_things", yesterdayViews: 2900, weekViews: 20000, monthViews: 85000, yearViews: 1020000, ...owned("TechGuru", "IoT Masters", 4) },
    { id: 13, title: "Quantum Computing", slug: "Quantum_computing", yesterdayViews: 5100, weekViews: 36000, monthViews: 140000, yearViews: 1680000, ...free },
    { id: 14, title: "Cybersecurity", slug: "Computer_security", yesterdayViews: 4100, weekViews: 28000, monthViews: 115000, yearViews: 1380000, ...free },
    { id: 15, title: "Data Science", slug: "Data_science", yesterdayViews: 3500, weekViews: 24000, monthViews: 98000, yearViews: 1176000, ...owned("DataNerd", "Stats Squad", 6) },
    { id: 16, title: "Virtual Reality", slug: "Virtual_reality", yesterdayViews: 2700, weekViews: 19000, monthViews: 78000, yearViews: 936000, ...free },
    { id: 17, title: "Augmented Reality", slug: "Augmented_reality", yesterdayViews: 2300, weekViews: 16000, monthViews: 67000, yearViews: 804000, ...free },
    { id: 18, title: "5G", slug: "5G", yesterdayViews: 3100, weekViews: 21000, monthViews: 88000, yearViews: 1056000, ...free },
    { id: 19, title: "Metaverse", slug: "Metaverse", yesterdayViews: 4400, weekViews: 31000, monthViews: 120000, yearViews: 1440000, ...owned("MetaKing", "Virtual Ventures", 3) },
    { id: 20, title: "Robotics", slug: "Robotics", yesterdayViews: 3300, weekViews: 23000, monthViews: 92000, yearViews: 1104000, ...free },
    { id: 21, title: "Natural Language Processing", slug: "Natural_language_processing", yesterdayViews: 2400, weekViews: 17000, monthViews: 70000, yearViews: 840000, ...free },
    { id: 22, title: "Computer Vision", slug: "Computer_vision", yesterdayViews: 1900, weekViews: 13000, monthViews: 54000, yearViews: 648000, ...free },
    { id: 23, title: "Edge Computing", slug: "Edge_computing", yesterdayViews: 1500, weekViews: 10000, monthViews: 42000, yearViews: 504000, ...owned("EdgeLord", "Distributed Gang", 7) },
    { id: 24, title: "Digital Twin", slug: "Digital_twin", yesterdayViews: 1200, weekViews: 8500, monthViews: 35000, yearViews: 420000, ...free },
    { id: 25, title: "Web3", slug: "Web3", yesterdayViews: 3600, weekViews: 25000, monthViews: 100000, yearViews: 1200000, ...free },
    { id: 26, title: "Large Language Model", slug: "Large_language_model", yesterdayViews: 9500, weekViews: 65000, monthViews: 220000, yearViews: 2800000, ...owned("AIWhiz", "Neural Network", 2) },
    { id: 27, title: "GPT-4", slug: "GPT-4", yesterdayViews: 8200, weekViews: 58000, monthViews: 200000, yearViews: 2400000, ...free },
    { id: 28, title: "Neural Network", slug: "Neural_network", yesterdayViews: 2800, weekViews: 19500, monthViews: 82000, yearViews: 984000, ...free },
  ],
  europe: [
    { id: 1, title: "European Union", slug: "European_Union", yesterdayViews: 8500, weekViews: 60000, monthViews: 220000, yearViews: 2640000, ...free },
    { id: 2, title: "UEFA Champions League", slug: "UEFA_Champions_League", yesterdayViews: 12000, weekViews: 85000, monthViews: 300000, yearViews: 3600000, ...owned("FootballFan", "Goal Getters", 4) },
    { id: 3, title: "Paris", slug: "Paris", yesterdayViews: 7200, weekViews: 50000, monthViews: 190000, yearViews: 2280000, ...free },
    { id: 4, title: "Berlin", slug: "Berlin", yesterdayViews: 5800, weekViews: 40000, monthViews: 155000, yearViews: 1860000, ...free },
    { id: 5, title: "Rome", slug: "Rome", yesterdayViews: 6100, weekViews: 43000, monthViews: 165000, yearViews: 1980000, ...owned("HistoryBuff", "Ancient Legends", 3) },
    { id: 6, title: "Brexit", slug: "Brexit", yesterdayViews: 3200, weekViews: 22000, monthViews: 90000, yearViews: 1080000, ...free },
    { id: 7, title: "Euro", slug: "Euro_(currency)", yesterdayViews: 4100, weekViews: 29000, monthViews: 115000, yearViews: 1380000, ...free },
    { id: 8, title: "Eiffel Tower", slug: "Eiffel_Tower", yesterdayViews: 9800, weekViews: 68000, monthViews: 260000, yearViews: 3120000, ...free },
    { id: 9, title: "Colosseum", slug: "Colosseum", yesterdayViews: 7500, weekViews: 52000, monthViews: 200000, yearViews: 2400000, ...owned("RomanEmperor", "Gladiators", 5) },
    { id: 10, title: "Renaissance", slug: "Renaissance", yesterdayViews: 3400, weekViews: 24000, monthViews: 95000, yearViews: 1140000, ...free },
    { id: 11, title: "Mozart", slug: "Wolfgang_Amadeus_Mozart", yesterdayViews: 4500, weekViews: 31000, monthViews: 125000, yearViews: 1500000, ...free },
    { id: 12, title: "Ludwig van Beethoven", slug: "Ludwig_van_Beethoven", yesterdayViews: 3800, weekViews: 27000, monthViews: 108000, yearViews: 1296000, ...owned("MusicMaster", "Symphony", 6) },
    { id: 13, title: "Leonardo da Vinci", slug: "Leonardo_da_Vinci", yesterdayViews: 6300, weekViews: 44000, monthViews: 170000, yearViews: 2040000, ...free },
    { id: 14, title: "Napoleon", slug: "Napoleon", yesterdayViews: 5500, weekViews: 38000, monthViews: 150000, yearViews: 1800000, ...free },
    { id: 15, title: "World War II", slug: "World_War_II", yesterdayViews: 14000, weekViews: 98000, monthViews: 380000, yearViews: 4560000, ...free },
    { id: 16, title: "Amsterdam", slug: "Amsterdam", yesterdayViews: 4900, weekViews: 34000, monthViews: 135000, yearViews: 1620000, ...owned("DutchMaster", "Windmill FC", 4) },
    { id: 17, title: "Barcelona", slug: "Barcelona", yesterdayViews: 7800, weekViews: 55000, monthViews: 210000, yearViews: 2520000, ...free },
    { id: 18, title: "Mona Lisa", slug: "Mona_Lisa", yesterdayViews: 5200, weekViews: 36000, monthViews: 140000, yearViews: 1680000, ...free },
    { id: 19, title: "Stonehenge", slug: "Stonehenge", yesterdayViews: 3000, weekViews: 21000, monthViews: 85000, yearViews: 1020000, ...free },
    { id: 20, title: "Viking Age", slug: "Viking_Age", yesterdayViews: 2600, weekViews: 18000, monthViews: 74000, yearViews: 888000, ...owned("NorseLord", "Valhalla", 3) },
    { id: 21, title: "Alps", slug: "Alps", yesterdayViews: 2200, weekViews: 15000, monthViews: 62000, yearViews: 744000, ...free },
    { id: 22, title: "London", slug: "London", yesterdayViews: 11000, weekViews: 77000, monthViews: 290000, yearViews: 3480000, ...free },
    { id: 23, title: "Madrid", slug: "Madrid", yesterdayViews: 6800, weekViews: 47000, monthViews: 180000, yearViews: 2160000, ...free },
    { id: 24, title: "Parthenon", slug: "Parthenon", yesterdayViews: 2800, weekViews: 19000, monthViews: 78000, yearViews: 936000, ...owned("GreekGod", "Olympians", 5) },
    { id: 25, title: "Industrial Revolution", slug: "Industrial_Revolution", yesterdayViews: 4300, weekViews: 30000, monthViews: 118000, yearViews: 1416000, ...free },
  ],
  americas: [
    { id: 1, title: "United States", slug: "United_States", yesterdayViews: 18000, weekViews: 125000, monthViews: 480000, yearViews: 5760000, ...free },
    { id: 2, title: "Amazon Rainforest", slug: "Amazon_rainforest", yesterdayViews: 4200, weekViews: 29000, monthViews: 115000, yearViews: 1380000, ...owned("NatureLover", "Green Team", 4) },
    { id: 3, title: "NASA", slug: "NASA", yesterdayViews: 7500, weekViews: 52000, monthViews: 200000, yearViews: 2400000, ...free },
    { id: 4, title: "Super Bowl", slug: "Super_Bowl", yesterdayViews: 15000, weekViews: 105000, monthViews: 400000, yearViews: 4800000, ...free },
    { id: 5, title: "Machu Picchu", slug: "Machu_Picchu", yesterdayViews: 5600, weekViews: 39000, monthViews: 150000, yearViews: 1800000, ...owned("InkaKing", "Andes FC", 3) },
    { id: 6, title: "Grand Canyon", slug: "Grand_Canyon", yesterdayViews: 4800, weekViews: 33000, monthViews: 130000, yearViews: 1560000, ...free },
    { id: 7, title: "Wall Street", slug: "Wall_Street", yesterdayViews: 6200, weekViews: 43000, monthViews: 168000, yearViews: 2016000, ...free },
    { id: 8, title: "Silicon Valley", slug: "Silicon_Valley", yesterdayViews: 3900, weekViews: 27000, monthViews: 108000, yearViews: 1296000, ...owned("TechBro", "Startup City", 6) },
    { id: 9, title: "Hollywood", slug: "Hollywood", yesterdayViews: 8200, weekViews: 57000, monthViews: 220000, yearViews: 2640000, ...free },
    { id: 10, title: "NBA", slug: "National_Basketball_Association", yesterdayViews: 11000, weekViews: 77000, monthViews: 295000, yearViews: 3540000, ...free },
    { id: 11, title: "Statue of Liberty", slug: "Statue_of_Liberty", yesterdayViews: 5100, weekViews: 35000, monthViews: 138000, yearViews: 1656000, ...free },
    { id: 12, title: "Niagara Falls", slug: "Niagara_Falls", yesterdayViews: 3600, weekViews: 25000, monthViews: 98000, yearViews: 1176000, ...owned("WaterFall", "Cascaders", 5) },
    { id: 13, title: "Broadway", slug: "Broadway_(Manhattan)", yesterdayViews: 3100, weekViews: 22000, monthViews: 86000, yearViews: 1032000, ...free },
    { id: 14, title: "Rio de Janeiro", slug: "Rio_de_Janeiro", yesterdayViews: 5400, weekViews: 38000, monthViews: 148000, yearViews: 1776000, ...free },
    { id: 15, title: "Panama Canal", slug: "Panama_Canal", yesterdayViews: 2700, weekViews: 19000, monthViews: 75000, yearViews: 900000, ...free },
    { id: 16, title: "Jazz", slug: "Jazz", yesterdayViews: 3300, weekViews: 23000, monthViews: 92000, yearViews: 1104000, ...owned("JazzCat", "Blue Notes", 4) },
    { id: 17, title: "Yellowstone", slug: "Yellowstone_National_Park", yesterdayViews: 4500, weekViews: 31000, monthViews: 122000, yearViews: 1464000, ...free },
    { id: 18, title: "Chichen Itza", slug: "Chichen_Itza", yesterdayViews: 3800, weekViews: 26000, monthViews: 105000, yearViews: 1260000, ...free },
    { id: 19, title: "Baseball", slug: "Baseball", yesterdayViews: 6800, weekViews: 47000, monthViews: 182000, yearViews: 2184000, ...free },
    { id: 20, title: "Golden Gate Bridge", slug: "Golden_Gate_Bridge", yesterdayViews: 4000, weekViews: 28000, monthViews: 110000, yearViews: 1320000, ...owned("BridgeBuilder", "SF Giants", 3) },
    { id: 21, title: "Alaska", slug: "Alaska", yesterdayViews: 2900, weekViews: 20000, monthViews: 80000, yearViews: 960000, ...free },
    { id: 22, title: "Carnival", slug: "Brazilian_Carnival", yesterdayViews: 3400, weekViews: 24000, monthViews: 94000, yearViews: 1128000, ...free },
  ],
  asia: [
    { id: 1, title: "Great Wall of China", slug: "Great_Wall_of_China", yesterdayViews: 9200, weekViews: 64000, monthViews: 245000, yearViews: 2940000, ...free },
    { id: 2, title: "Tokyo", slug: "Tokyo", yesterdayViews: 8500, weekViews: 59000, monthViews: 228000, yearViews: 2736000, ...owned("TokyoDrifter", "Rising Sun", 4) },
    { id: 3, title: "Taj Mahal", slug: "Taj_Mahal", yesterdayViews: 7100, weekViews: 50000, monthViews: 190000, yearViews: 2280000, ...free },
    { id: 4, title: "K-pop", slug: "K-pop", yesterdayViews: 12000, weekViews: 84000, monthViews: 320000, yearViews: 3840000, ...free },
    { id: 5, title: "Anime", slug: "Anime", yesterdayViews: 15000, weekViews: 105000, monthViews: 400000, yearViews: 4800000, ...owned("OtakuKing", "Manga Masters", 3) },
    { id: 6, title: "Bollywood", slug: "Bollywood", yesterdayViews: 6300, weekViews: 44000, monthViews: 170000, yearViews: 2040000, ...free },
    { id: 7, title: "Mount Everest", slug: "Mount_Everest", yesterdayViews: 4800, weekViews: 33000, monthViews: 130000, yearViews: 1560000, ...free },
    { id: 8, title: "Kung Fu", slug: "Chinese_martial_arts", yesterdayViews: 3500, weekViews: 24000, monthViews: 96000, yearViews: 1152000, ...owned("DragonFist", "Shaolin FC", 6) },
    { id: 9, title: "Silk Road", slug: "Silk_Road", yesterdayViews: 4100, weekViews: 29000, monthViews: 112000, yearViews: 1344000, ...free },
    { id: 10, title: "Samurai", slug: "Samurai", yesterdayViews: 5200, weekViews: 36000, monthViews: 140000, yearViews: 1680000, ...free },
    { id: 11, title: "Sushi", slug: "Sushi", yesterdayViews: 6800, weekViews: 47000, monthViews: 182000, yearViews: 2184000, ...free },
    { id: 12, title: "Manga", slug: "Manga", yesterdayViews: 11000, weekViews: 77000, monthViews: 295000, yearViews: 3540000, ...owned("MangaFan", "Comic Kings", 4) },
    { id: 13, title: "Buddhism", slug: "Buddhism", yesterdayViews: 5600, weekViews: 39000, monthViews: 152000, yearViews: 1824000, ...free },
    { id: 14, title: "Terracotta Army", slug: "Terracotta_Army", yesterdayViews: 3200, weekViews: 22000, monthViews: 88000, yearViews: 1056000, ...free },
    { id: 15, title: "Singapore", slug: "Singapore", yesterdayViews: 5900, weekViews: 41000, monthViews: 158000, yearViews: 1896000, ...free },
    { id: 16, title: "Angkor Wat", slug: "Angkor_Wat", yesterdayViews: 3800, weekViews: 26000, monthViews: 102000, yearViews: 1224000, ...owned("TempleRunner", "Khmer Legends", 5) },
    { id: 17, title: "Yoga", slug: "Yoga", yesterdayViews: 7800, weekViews: 54000, monthViews: 210000, yearViews: 2520000, ...free },
    { id: 18, title: "Ramen", slug: "Ramen", yesterdayViews: 4400, weekViews: 31000, monthViews: 120000, yearViews: 1440000, ...free },
    { id: 19, title: "Geisha", slug: "Geisha", yesterdayViews: 2900, weekViews: 20000, monthViews: 80000, yearViews: 960000, ...free },
    { id: 20, title: "Bali", slug: "Bali", yesterdayViews: 6500, weekViews: 45000, monthViews: 175000, yearViews: 2100000, ...owned("IslandHopper", "Tropical FC", 3) },
    { id: 21, title: "Cherry Blossom", slug: "Cherry_blossom", yesterdayViews: 3600, weekViews: 25000, monthViews: 98000, yearViews: 1176000, ...free },
    { id: 22, title: "Himalaya", slug: "Himalayas", yesterdayViews: 4000, weekViews: 28000, monthViews: 108000, yearViews: 1296000, ...free },
    { id: 23, title: "Confucius", slug: "Confucius", yesterdayViews: 3100, weekViews: 21000, monthViews: 85000, yearViews: 1020000, ...free },
    { id: 24, title: "Korean Wave", slug: "Korean_Wave", yesterdayViews: 8800, weekViews: 62000, monthViews: 235000, yearViews: 2820000, ...owned("HallyuStar", "K-Culture", 4) },
    { id: 25, title: "Origami", slug: "Origami", yesterdayViews: 2500, weekViews: 17000, monthViews: 68000, yearViews: 816000, ...free },
  ],
  premier: [
    { id: 1, title: "Premier League", slug: "Premier_League", yesterdayViews: 22000, weekViews: 154000, monthViews: 580000, yearViews: 6960000, ...free },
    { id: 2, title: "Shakespeare", slug: "William_Shakespeare", yesterdayViews: 8500, weekViews: 59000, monthViews: 228000, yearViews: 2736000, ...owned("BardFan", "Globe Theatre", 4) },
    { id: 3, title: "Oxford University", slug: "University_of_Oxford", yesterdayViews: 5400, weekViews: 38000, monthViews: 145000, yearViews: 1740000, ...free },
    { id: 4, title: "British Museum", slug: "British_Museum", yesterdayViews: 4200, weekViews: 29000, monthViews: 115000, yearViews: 1380000, ...free },
    { id: 5, title: "The Beatles", slug: "The_Beatles", yesterdayViews: 9800, weekViews: 68000, monthViews: 262000, yearViews: 3144000, ...owned("RockStar", "Abbey Road", 3) },
    { id: 6, title: "Harry Potter", slug: "Harry_Potter", yesterdayViews: 14000, weekViews: 98000, monthViews: 375000, yearViews: 4500000, ...free },
    { id: 7, title: "Isaac Newton", slug: "Isaac_Newton", yesterdayViews: 6200, weekViews: 43000, monthViews: 168000, yearViews: 2016000, ...free },
    { id: 8, title: "Queen Elizabeth II", slug: "Elizabeth_II", yesterdayViews: 7100, weekViews: 50000, monthViews: 192000, yearViews: 2304000, ...free },
    { id: 9, title: "Buckingham Palace", slug: "Buckingham_Palace", yesterdayViews: 5800, weekViews: 40000, monthViews: 155000, yearViews: 1860000, ...owned("RoyalGuard", "Crown Jewels", 5) },
    { id: 10, title: "Charles Darwin", slug: "Charles_Darwin", yesterdayViews: 4600, weekViews: 32000, monthViews: 125000, yearViews: 1500000, ...free },
    { id: 11, title: "Sherlock Holmes", slug: "Sherlock_Holmes", yesterdayViews: 5100, weekViews: 35000, monthViews: 138000, yearViews: 1656000, ...free },
    { id: 12, title: "Big Ben", slug: "Big_Ben", yesterdayViews: 4400, weekViews: 31000, monthViews: 120000, yearViews: 1440000, ...free },
    { id: 13, title: "James Bond", slug: "James_Bond", yesterdayViews: 7500, weekViews: 52000, monthViews: 200000, yearViews: 2400000, ...owned("Agent007", "MI6 Squad", 4) },
    { id: 14, title: "Tea", slug: "Tea", yesterdayViews: 3800, weekViews: 26000, monthViews: 102000, yearViews: 1224000, ...free },
    { id: 15, title: "Manchester United", slug: "Manchester_United_F.C.", yesterdayViews: 13000, weekViews: 91000, monthViews: 350000, yearViews: 4200000, ...free },
    { id: 16, title: "Tower of London", slug: "Tower_of_London", yesterdayViews: 3500, weekViews: 24000, monthViews: 95000, yearViews: 1140000, ...owned("MedievalKnight", "Castle Keep", 6) },
    { id: 17, title: "Cricket", slug: "Cricket", yesterdayViews: 8900, weekViews: 62000, monthViews: 240000, yearViews: 2880000, ...free },
    { id: 18, title: "Doctor Who", slug: "Doctor_Who", yesterdayViews: 5600, weekViews: 39000, monthViews: 150000, yearViews: 1800000, ...free },
    { id: 19, title: "Winston Churchill", slug: "Winston_Churchill", yesterdayViews: 6800, weekViews: 47000, monthViews: 182000, yearViews: 2184000, ...free },
    { id: 20, title: "Stonehenge", slug: "Stonehenge", yesterdayViews: 3200, weekViews: 22000, monthViews: 88000, yearViews: 1056000, ...owned("AncientOne", "Druids", 3) },
    { id: 21, title: "Wimbledon", slug: "Wimbledon_Championships", yesterdayViews: 7200, weekViews: 50000, monthViews: 195000, yearViews: 2340000, ...free },
    { id: 22, title: "Rolling Stones", slug: "The_Rolling_Stones", yesterdayViews: 4900, weekViews: 34000, monthViews: 132000, yearViews: 1584000, ...free },
  ],
  champions: [
    { id: 1, title: "FIFA World Cup", slug: "FIFA_World_Cup", yesterdayViews: 25000, weekViews: 175000, monthViews: 670000, yearViews: 8040000, ...free },
    { id: 2, title: "Olympics", slug: "Olympic_Games", yesterdayViews: 18000, weekViews: 126000, monthViews: 480000, yearViews: 5760000, ...owned("GoldMedalist", "Podium FC", 4) },
    { id: 3, title: "Lionel Messi", slug: "Lionel_Messi", yesterdayViews: 22000, weekViews: 154000, monthViews: 590000, yearViews: 7080000, ...free },
    { id: 4, title: "Cristiano Ronaldo", slug: "Cristiano_Ronaldo", yesterdayViews: 20000, weekViews: 140000, monthViews: 535000, yearViews: 6420000, ...free },
    { id: 5, title: "Albert Einstein", slug: "Albert_Einstein", yesterdayViews: 12000, weekViews: 84000, monthViews: 320000, yearViews: 3840000, ...owned("GeniusMind", "Relativity", 3) },
    { id: 6, title: "Elon Musk", slug: "Elon_Musk", yesterdayViews: 15000, weekViews: 105000, monthViews: 400000, yearViews: 4800000, ...free },
    { id: 7, title: "Taylor Swift", slug: "Taylor_Swift", yesterdayViews: 28000, weekViews: 196000, monthViews: 750000, yearViews: 9000000, ...free },
    { id: 8, title: "Climate Change", slug: "Climate_change", yesterdayViews: 9500, weekViews: 66000, monthViews: 255000, yearViews: 3060000, ...owned("EcoWarrior", "Green Planet", 5) },
    { id: 9, title: "COVID-19", slug: "COVID-19", yesterdayViews: 8200, weekViews: 57000, monthViews: 220000, yearViews: 2640000, ...free },
    { id: 10, title: "SpaceX", slug: "SpaceX", yesterdayViews: 11000, weekViews: 77000, monthViews: 295000, yearViews: 3540000, ...free },
    { id: 11, title: "Moon Landing", slug: "Moon_landing", yesterdayViews: 6800, weekViews: 47000, monthViews: 182000, yearViews: 2184000, ...free },
    { id: 12, title: "Wikipedia", slug: "Wikipedia", yesterdayViews: 7500, weekViews: 52000, monthViews: 200000, yearViews: 2400000, ...owned("MetaPlayer", "Wiki Warriors", 6) },
    { id: 13, title: "Game of Thrones", slug: "Game_of_Thrones", yesterdayViews: 9800, weekViews: 68000, monthViews: 262000, yearViews: 3144000, ...free },
    { id: 14, title: "Marvel Universe", slug: "Marvel_Cinematic_Universe", yesterdayViews: 13000, weekViews: 91000, monthViews: 350000, yearViews: 4200000, ...free },
    { id: 15, title: "Star Wars", slug: "Star_Wars", yesterdayViews: 11500, weekViews: 80000, monthViews: 308000, yearViews: 3696000, ...owned("JediMaster", "Force FC", 4) },
    { id: 16, title: "Tesla", slug: "Tesla,_Inc.", yesterdayViews: 10000, weekViews: 70000, monthViews: 268000, yearViews: 3216000, ...free },
    { id: 17, title: "Apple Inc.", slug: "Apple_Inc.", yesterdayViews: 14000, weekViews: 98000, monthViews: 375000, yearViews: 4500000, ...free },
    { id: 18, title: "Google", slug: "Google", yesterdayViews: 12500, weekViews: 87000, monthViews: 335000, yearViews: 4020000, ...free },
    { id: 19, title: "Amazon", slug: "Amazon_(company)", yesterdayViews: 9200, weekViews: 64000, monthViews: 245000, yearViews: 2940000, ...owned("PrimeMember", "Delivery Kings", 3) },
    { id: 20, title: "Michael Jordan", slug: "Michael_Jordan", yesterdayViews: 8800, weekViews: 62000, monthViews: 235000, yearViews: 2820000, ...free },
    { id: 21, title: "Super Mario", slug: "Super_Mario", yesterdayViews: 7200, weekViews: 50000, monthViews: 192000, yearViews: 2304000, ...free },
    { id: 22, title: "Minecraft", slug: "Minecraft", yesterdayViews: 16000, weekViews: 112000, monthViews: 430000, yearViews: 5160000, ...owned("BlockBuilder", "Pixel Crew", 5) },
    { id: 23, title: "ChatGPT", slug: "ChatGPT", yesterdayViews: 19000, weekViews: 133000, monthViews: 510000, yearViews: 6120000, ...free },
    { id: 24, title: "iPhone", slug: "IPhone", yesterdayViews: 13500, weekViews: 94000, monthViews: 360000, yearViews: 4320000, ...free },
    { id: 25, title: "YouTube", slug: "YouTube", yesterdayViews: 17000, weekViews: 119000, monthViews: 455000, yearViews: 5460000, ...free },
  ],
};

// Helper to get market articles for a league (falls back to global)
export function getMarketArticles(leagueId: string): MarketArticle[] {
  return marketArticlesByLeague[leagueId] || marketArticlesByLeague.global;
}

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
