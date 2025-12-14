import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import { EnergyMixPage } from './EnergyMixPage';
import { energyMixApi } from '../api/energyMixApi';
import type { EnergyMixSummary } from '../types';

vi.mock('../api/energyMixApi', () => ({
  energyMixApi: {
    get: vi.fn(),
  },
}));

const mockResponseData: EnergyMixSummary[] = [
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

describe('EnergyMixPage', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page header correctly', () => {
    vi.mocked(energyMixApi.get).mockResolvedValue({
      data: mockResponseData,
    });

    render(<EnergyMixPage />);

    expect(
      screen.getByText(/UK Energy Mix – Current & Forecast Overview/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Breakdown of current and forecasted electricity generation sources/i)
    ).toBeInTheDocument();
  });

  it('calls energy mix API on mount', async () => {
    vi.mocked(energyMixApi.get).mockResolvedValue({
      data: mockResponseData,
    });

    render(<EnergyMixPage />);

    await waitFor(() => {
      expect(energyMixApi.get).toHaveBeenCalledWith('/energy/mix/summary');
    });
  });

  it('renders energy charts after data is loaded', async () => {
    vi.mocked(energyMixApi.get).mockResolvedValue({
      data: mockResponseData,
    });

    const { container } = render(<EnergyMixPage />);

    await waitFor(() => {
      expect(container.querySelectorAll('.energy-pie')).toHaveLength(2);
    });

    expect(screen.getByText('2025-12-14')).toBeInTheDocument();
    expect(screen.getByText('2025-12-15')).toBeInTheDocument();
  });

  it('renders CleanEnergyChargingOptimizer section', async () => {
    vi.mocked(energyMixApi.get).mockResolvedValue({
      data: mockResponseData,
    });

    render(<EnergyMixPage />);

    expect(
      await screen.findByText(/Determine the best charging time/i)
    ).toBeInTheDocument();
  });
});