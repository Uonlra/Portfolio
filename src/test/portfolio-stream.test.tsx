import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PortfolioStream } from '@/components/portfolio/portfolio-stream';
import portfolioData from '@/data/portfolio.json';
import type { Project } from '@/types/portfolio';

vi.mock('@/components/portfolio/portfolio-stream-item', () => ({
  PortfolioStreamItem: ({ project }: { project: Project }) => (
    <article>
      <h2>{project.title}</h2>
    </article>
  ),
}));

describe('PortfolioStream', () => {
  it('renders projects in the supplied order', () => {
    const projects = portfolioData.projects as Project[];

    render(<PortfolioStream projects={projects} />);

    expect(screen.getAllByRole('heading').map((heading) => heading.textContent)).toEqual([
      'TaskFlow',
      'RedditLike',
      'U-s-cinema',
    ]);
  });

  it('renders an empty state when there are no projects', () => {
    render(<PortfolioStream projects={[]} />);

    expect(screen.getByText('暂无可展示的项目。')).toBeInTheDocument();
  });
});
