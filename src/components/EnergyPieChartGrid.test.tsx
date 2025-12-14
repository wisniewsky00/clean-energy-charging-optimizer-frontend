import { render, screen } from '@testing-library/react';
import { EnergyPieChartGrid } from './EnergyPieChartGrid';
import type { EnergyMixSummary } from '../types';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const mockData: EnergyMixSummary[] = [
  {
    from: '2025-12-14T00:00:00Z',
    to: '2025-12-15T00:00:00Z',
    avgGas: 20,
    avgCoal: 0,
    avgBiomass: 10,
    avgNuclear: 30,
    avgHydro: 0,
    avgImports: 0,
    avgOther: 0,
    avgWind: 40,
    avgSolar: 0,
    avgCleanEnergy: 80,
  },
  {
    from: '2025-12-15T00:00:00Z',
    to: '2025-12-16T00:00:00Z',
    avgGas: 30,
    avgCoal: 0,
    avgBiomass: 10,
    avgNuclear: 20,
    avgHydro: 0,
    avgImports: 0,
    avgOther: 0,
    avgWind: 40,
    avgSolar: 0,
    avgCleanEnergy: 70,
  },
];

describe('EnergyPieChartGrid', () => {
  it('renders a chart for each provided day', () => {
    const { container } = render(
      <EnergyPieChartGrid data={mockData} />
    );

    const charts = container.querySelectorAll('.energy-pie');
    expect(charts).toHaveLength(2);
  });

  it('renders correct dates for each chart', () => {
    render(<EnergyPieChartGrid data={mockData} />);

    expect(screen.getByText('2025-12-14')).toBeInTheDocument();
    expect(screen.getByText('2025-12-15')).toBeInTheDocument();
  });

  it('renders clean energy information for each chart', () => {
    render(<EnergyPieChartGrid data={mockData} />);

    expect(screen.getByText(/80%/)).toBeInTheDocument();
    expect(screen.getByText(/70%/)).toBeInTheDocument();
  });

  it('renders no charts when data array is empty', () => {
    const { container } = render(
      <EnergyPieChartGrid data={[]} />
    );

    expect(container.querySelectorAll('.energy-pie')).toHaveLength(0);
  });
});
