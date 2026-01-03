import { Formation } from "@/pages/Team";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormationSelectorProps {
  formations: Formation[];
  currentFormation: Formation;
  onFormationChange: (formation: Formation) => void;
}

export function FormationSelector({ formations, currentFormation, onFormationChange }: FormationSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Formation</h3>
      <div className="flex flex-wrap gap-2">
        {formations.map((formation) => (
          <Button
            key={formation.id}
            variant={currentFormation.id === formation.id ? "default" : "outline"}
            size="sm"
            onClick={() => onFormationChange(formation)}
            className={cn(
              "min-w-[70px]",
              currentFormation.id === formation.id && "shadow-glow"
            )}
          >
            {formation.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
