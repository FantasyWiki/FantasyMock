import { useEffect, useRef, useState } from "react";
import { Article } from "@/pages/Team";
import { ChemistryLink, generateChemistryLinks, getChemistryColor } from "@/lib/chemistry";

interface ChemistryLinksProps {
  articles: {
    forwards: Article[];
    midfielders: Article[];
    defenders: Article[];
    goalkeeper: Article | undefined;
  };
  containerRef: React.RefObject<HTMLDivElement>;
}

interface NodePosition {
  id: string;
  x: number;
  y: number;
}

export function ChemistryLinks({ articles, containerRef }: ChemistryLinksProps) {
  const [positions, setPositions] = useState<NodePosition[]>([]);
  const [links, setLinks] = useState<ChemistryLink[]>([]);

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const nodes = container.querySelectorAll("[data-article-id]");
      
      const newPositions: NodePosition[] = [];
      
      nodes.forEach((node) => {
        const id = node.getAttribute("data-article-id");
        if (id) {
          const rect = node.getBoundingClientRect();
          newPositions.push({
            id,
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
          });
        }
      });

      setPositions(newPositions);
    };

    const newLinks = generateChemistryLinks(articles);
    setLinks(newLinks);

    // Initial update and resize listener
    const timeout = setTimeout(updatePositions, 100);
    window.addEventListener("resize", updatePositions);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updatePositions);
    };
  }, [articles, containerRef]);

  const getPosition = (id: string) => positions.find(p => p.id === id);

  if (positions.length === 0) return null;

  return (
    <svg className="absolute inset-0 pointer-events-none w-full h-full" style={{ zIndex: 0 }}>
      {links.map((link, index) => {
        const from = getPosition(link.from);
        const to = getPosition(link.to);
        
        if (!from || !to) return null;

        return (
          <line
            key={`${link.from}-${link.to}-${index}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={getChemistryColor(link.type)}
            strokeWidth={3}
            strokeOpacity={0.7}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
