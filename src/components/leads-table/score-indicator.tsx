import { getScoreIndicatorClasses } from "./utils";
import type { ScoreIndicatorProps } from "./types";

export function ScoreIndicator({ score }: ScoreIndicatorProps) {
  const { scoreClass, width } = getScoreIndicatorClasses(score);

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-muted rounded-full h-1.5">
        <div className={`score-bar ${scoreClass}`} style={{ width: `${width}%` }} />
      </div>
      <span className="text-sm font-medium text-foreground">{score}</span>
    </div>
  );
}
