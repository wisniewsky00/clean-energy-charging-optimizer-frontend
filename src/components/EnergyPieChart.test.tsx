import { render, screen } from '@testing-library/react';
import { EnergyPieChart } from './EnergyPieChart';
import type { EnergyMixSummary } from '../types';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const mockDay: EnergyMixSummary = {
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
};

describe('EnergyPieChart', () => {
  it('renders date and clean energy percentage', () => {
    render(<EnergyPieChart day={mockDay} />);

    expect(screen.getByText('2025-12-14')).toBeInTheDocument();
    expect(screen.getByText(/Share of clean energy/i)).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });
});
