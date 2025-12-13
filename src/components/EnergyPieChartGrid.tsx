import { EnergyPieChart } from './EnergyPieChart';
import './EnergyPieChartGrid.css';
import type { EnergyMixDay } from '../types';

interface EnergyPieChartGridProps {
  data: EnergyMixDay[];
}

export function EnergyPieChartGrid({ data }: EnergyPieChartGridProps ){
  return (
    <div className="pie-chart-grid">
      {data.map((day, index) => (
        <EnergyPieChart key={index} day={day} />
      ))}
    </div>
  );
}