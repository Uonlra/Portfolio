import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PortfolioMedia } from '@/components/portfolio/portfolio-media';

describe('PortfolioMedia', () => {
  it('renders an image asset with its alt text', () => {
    render(
      <PortfolioMedia
        asset={{
          id: 'taskflow-hero',
          type: 'image',
          src: '/projects/taskflow/hero-placeholder.svg',
          alt: 'TaskFlow 工作台预览',
        }}
      />,
    );

    expect(screen.getByAltText('TaskFlow 工作台预览')).toBeInTheDocument();
  });

  it('renders a fallback for video assets', () => {
    render(
      <PortfolioMedia
        asset={{
          id: 'taskflow-video',
          type: 'video',
          src: '/media/taskflow.mp4',
          alt: 'TaskFlow 操作预览',
        }}
      />,
    );

    expect(screen.getByText('视频预览为后续版本')).toBeInTheDocument();
  });

  it('renders an error fallback when an image fails to load', () => {
    render(
      <PortfolioMedia
        asset={{
          id: 'broken-image',
          type: 'image',
          src: '/broken-image.svg',
          alt: '损坏的图片',
        }}
      />,
    );

    fireEvent.error(screen.getByAltText('损坏的图片'));

    expect(screen.getByText('暂时无法加载媒体')).toBeInTheDocument();
  });
});
