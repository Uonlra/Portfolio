import Link from 'next/link';
import { motion } from 'motion/react';

import { PortfolioMedia } from '@/components/portfolio/portfolio-media';
import type { Project } from '@/types/portfolio';

type PortfolioStreamItemProps = {
  project: Project;
  priority?: boolean;
};

const categoryLabels: Record<Project['category'], string> = {
  workbench: '工作台',
  community: '社区产品',
  media: '媒体产品',
  other: '其他',
};

export function PortfolioStreamItem({ project, priority = false }: PortfolioStreamItemProps) {
  return (
    <motion.article
      className="group border-b border-border py-12 first:pt-0 last:border-b-0 lg:py-20"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
      >
        <motion.div
          className="overflow-hidden"
          initial={{ scale: 1.02 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <PortfolioMedia
            asset={project.evidence.heroImage}
            priority={priority}
            sizes="(max-width: 768px) 100vw, 90vw"
            className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </motion.div>

        <div className="grid gap-5 pt-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <span>{categoryLabels[project.category]}</span>
              <span aria-hidden="true">/</span>
              <span>{project.timeRange}</span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight transition-colors group-hover:text-muted-foreground sm:text-4xl">
              {project.title}
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-base leading-7 text-muted-foreground">{project.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.slice(0, 6).map((technology) => (
                <span key={technology} className="border border-border px-2.5 py-1 text-xs text-muted-foreground">
                  {technology}
                </span>
              ))}
            </div>

            <span className="mt-6 inline-flex items-center text-sm font-medium underline decoration-border underline-offset-4 transition-colors group-hover:decoration-foreground">
              阅读项目案例
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
