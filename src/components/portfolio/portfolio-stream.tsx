import { PortfolioStreamItem } from '@/components/portfolio/portfolio-stream-item';
import type { Project } from '@/types/portfolio';

type PortfolioStreamProps = {
  projects: Project[];
};

export function PortfolioStream({ projects }: PortfolioStreamProps) {
  if (projects.length === 0) {
    return (
      <p className="border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
        暂无可展示的项目。
      </p>
    );
  }

  return (
    <div aria-label="项目媒体流">
      {projects.map((project, index) => (
        <PortfolioStreamItem key={project.id} project={project} priority={index === 0} />
      ))}
    </div>
  );
}
