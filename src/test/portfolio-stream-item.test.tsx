import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PortfolioStreamItem } from '@/components/portfolio/portfolio-stream-item';
import portfolioData from '@/data/portfolio.json';
import type { Project } from '@/types/portfolio';

vi.mock('next/image', () => ({
  default: (
    props: React.ComponentProps<'img'> & {
      fill?: boolean;
      priority?: boolean;
    },
  ) => {
    const { fill, priority, ...imageProps } = props;

    void fill;
    void priority;

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={imageProps.alt ?? ''} {...imageProps} />
    );
  },
}));

vi.mock('motion/react', () => ({
  motion: {
    article: (props: React.ComponentProps<'article'> & Record<string, unknown>) => {
      const { children, initial, whileInView, viewport, transition, ...articleProps } = props;

      void initial;
      void whileInView;
      void viewport;
      void transition;

      return <article {...articleProps}>{children}</article>;
    },
    div: (props: React.ComponentProps<'div'> & Record<string, unknown>) => {
      const { children, initial, whileInView, viewport, transition, ...divProps } = props;

      void initial;
      void whileInView;
      void viewport;
      void transition;

      return <div {...divProps}>{children}</div>;
    },
  },
}));

describe('PortfolioStreamItem', () => {
  it('renders project media, summary, stack, and details link', () => {
    const project = portfolioData.projects[0] as Project;

    render(<PortfolioStreamItem project={project} priority />);

    expect(screen.getByRole('heading', { name: 'TaskFlow' })).toBeInTheDocument();
    expect(screen.getByAltText('TaskFlow 任务管理工作台预览')).toBeInTheDocument();
    expect(screen.getByText(project.summary)).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /阅读项目案例/ })).toHaveAttribute('href', '/projects/taskflow');
  });
});
