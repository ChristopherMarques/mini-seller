import { OpportunitiesHeaderProps } from "./types";
import { getHeaderClasses } from "./utils";

export function OpportunitiesHeader({ title, subtitle }: OpportunitiesHeaderProps) {
  const classes = getHeaderClasses();

  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>{title}</h2>
        <p className={classes.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
