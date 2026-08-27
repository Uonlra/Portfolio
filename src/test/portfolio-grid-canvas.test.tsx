import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PortfolioGridCanvas } from '@/components/portfolio/portfolio-grid-canvas';

describe('PortfolioGridCanvas', () => {
  it('renders a decorative canvas', () => {
    const canvas = render(<PortfolioGridCanvas />).container.querySelector('canvas');

    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not fail when canvas context is unavailable', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);

    expect(() => render(<PortfolioGridCanvas />)).not.toThrow();
  });
});
