import { Article } from "@/pages/Team";

export interface ChemistryLink {
  from: string;
  to: string;
  type: "green" | "yellow" | "orange" | "red";
}

export interface NeighborChemistry {
  article: Article;
  chemistry: "green" | "yellow" | "orange" | "red";
}

// Calculate chemistry between two articles based on their attributes
export function calculateChemistry(article1: Article, article2: Article): "green" | "yellow" | "orange" | "red" {
  // Mock chemistry calculation - in real app this would be based on article relationships
  const combinations: Record<string, "green" | "yellow" | "orange" | "red"> = {
    "Bitcoin-Ethereum": "green",
    "Bitcoin-Blockchain": "green",
    "Ethereum-Blockchain": "green",
    "AI-Machine Learning": "green",
    "Machine Learning-Python": "green",
    "JavaScript-TypeScript": "green",
    "JavaScript-React": "green",
    "TypeScript-React": "green",
    "Cloud Computing-AI": "yellow",
    "Cloud Computing-Machine Learning": "yellow",
    "Python-JavaScript": "yellow",
    "Bitcoin-AI": "yellow",
    "Ethereum-AI": "orange",
    "Wikipedia-React": "orange",
  };

  const key1 = `${article1.name}-${article2.name}`;
  const key2 = `${article2.name}-${article1.name}`;
  
  return combinations[key1] || combinations[key2] || "orange";
}

// Get neighbors for an article based on formation position
export function getArticleNeighbors(
  articleId: string,
  articles: {
    forwards: Article[];
    midfielders: Article[];
    defenders: Article[];
    goalkeeper: Article | undefined;
  }
): Article[] {
  const { forwards, midfielders, defenders, goalkeeper } = articles;
  const neighbors: Article[] = [];

  // Find which line the article is on
  const forwardIndex = forwards.findIndex(a => a.id === articleId);
  const midIndex = midfielders.findIndex(a => a.id === articleId);
  const defIndex = defenders.findIndex(a => a.id === articleId);
  const isGoalkeeper = goalkeeper?.id === articleId;

  if (forwardIndex !== -1) {
    // Forwards connect to adjacent forwards and all midfielders
    if (forwardIndex > 0) neighbors.push(forwards[forwardIndex - 1]);
    if (forwardIndex < forwards.length - 1) neighbors.push(forwards[forwardIndex + 1]);
    neighbors.push(...midfielders);
  } else if (midIndex !== -1) {
    // Midfielders connect to adjacent midfielders, forwards, and defenders
    if (midIndex > 0) neighbors.push(midfielders[midIndex - 1]);
    if (midIndex < midfielders.length - 1) neighbors.push(midfielders[midIndex + 1]);
    neighbors.push(...forwards);
    neighbors.push(...defenders);
  } else if (defIndex !== -1) {
    // Defenders connect to adjacent defenders, midfielders, and goalkeeper
    if (defIndex > 0) neighbors.push(defenders[defIndex - 1]);
    if (defIndex < defenders.length - 1) neighbors.push(defenders[defIndex + 1]);
    neighbors.push(...midfielders);
    if (goalkeeper) neighbors.push(goalkeeper);
  } else if (isGoalkeeper && goalkeeper) {
    // Goalkeeper connects to all defenders
    neighbors.push(...defenders);
  }

  return neighbors;
}

// Generate all chemistry links for the formation
export function generateChemistryLinks(articles: {
  forwards: Article[];
  midfielders: Article[];
  defenders: Article[];
  goalkeeper: Article | undefined;
}): ChemistryLink[] {
  const links: ChemistryLink[] = [];
  const { forwards, midfielders, defenders, goalkeeper } = articles;
  const addedLinks = new Set<string>();

  const addLink = (a1: Article, a2: Article) => {
    const key = [a1.id, a2.id].sort().join("-");
    if (!addedLinks.has(key)) {
      addedLinks.add(key);
      links.push({
        from: a1.id,
        to: a2.id,
        type: calculateChemistry(a1, a2)
      });
    }
  };

  // Links within forwards (horizontal)
  for (let i = 0; i < forwards.length - 1; i++) {
    addLink(forwards[i], forwards[i + 1]);
  }

  // Links within midfielders (horizontal)
  for (let i = 0; i < midfielders.length - 1; i++) {
    addLink(midfielders[i], midfielders[i + 1]);
  }

  // Links within defenders (horizontal)
  for (let i = 0; i < defenders.length - 1; i++) {
    addLink(defenders[i], defenders[i + 1]);
  }

  // Links between forwards and midfielders (vertical - closest connections)
  for (const fwd of forwards) {
    for (const mid of midfielders) {
      addLink(fwd, mid);
    }
  }

  // Links between midfielders and defenders (vertical - closest connections)
  for (const mid of midfielders) {
    for (const def of defenders) {
      addLink(mid, def);
    }
  }

  // Links between defenders and goalkeeper
  if (goalkeeper) {
    for (const def of defenders) {
      addLink(def, goalkeeper);
    }
  }

  return links;
}

export function getChemistryColor(type: "green" | "yellow" | "orange" | "red"): string {
  switch (type) {
    case "green": return "hsl(var(--primary))";
    case "yellow": return "hsl(var(--wiki-gold))";
    case "orange": return "#f97316";
    case "red": return "hsl(var(--destructive))";
  }
}

export function getChemistryLabel(type: "green" | "yellow" | "orange" | "red"): { label: string; description: string } {
  switch (type) {
    case "green": return { label: "Excellent", description: "+20% bonus" };
    case "yellow": return { label: "Good", description: "+10% bonus" };
    case "orange": return { label: "Weak", description: "+5% bonus" };
    case "red": return { label: "Poor", description: "No bonus" };
  }
}
