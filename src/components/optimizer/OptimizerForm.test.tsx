import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OptimizerForm } from './OptimizerForm';
import { energyMixApi } from '../../api/energyMixApi';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../../api/energyMixApi');

describe('OptimizerForm', () => {

  it('renders select and button', () => {
    render(<OptimizerForm />);

    expect(screen.getByText(/Charging duration/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /find best charging time/i })
    ).toBeInTheDocument();
  });

  it('calls API with selected hours and shows result', async () => {
    vi.mocked(energyMixApi.get).mockResolvedValueOnce({
      data: {
        from: '2025-12-14T00:00:00Z',
        to: '2025-12-14T01:00:00Z',
        avgCleanEnergy: 75,
      },
    });

    render(<OptimizerForm />);

    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      '1'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /find best charging time/i })
    );

    expect(energyMixApi.get).toHaveBeenCalledWith(
      '/optimizer/clean/energy/optimize/window',
      { params: { chargingHoursLength: 1 } }
    );

    expect(await screen.findByText(/75%/)).toBeInTheDocument();
  });
});
