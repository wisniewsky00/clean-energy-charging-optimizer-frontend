import { useState } from "react"
import './OptimizerForm.css';
import { energyMixApi } from "../../api/energyMixApi";
import type {EnergyMixSummary} from '../../types';

export function OptimizerForm() {

  const [chargingHours, setChargingHours] = useState<number>(1);
  const [result, setResult] = useState<EnergyMixSummary | null>(null);

  const handleOptimize = async () => {

    const response = await energyMixApi.get<EnergyMixSummary>(
      "/optimizer/clean/energy/optimize/window",
      {
        params: {
          chargingHoursLength: chargingHours,
        },
      }
    )
    setResult(response.data);
  }

  return (
    <div className="optimizer-form">

      <label>
        Charging duration (hours)
      </label>

      <select
        id="charging-hours"
        value={chargingHours}
        onChange={(e) => setChargingHours(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5, 6].map((hour) => (
          <option key={hour} value={hour}>
            {hour} hour{hour > 1 ? "s" : ""}
          </option>
        ))}
      </select>

      <button
        className="optimizer-button"
        onClick={handleOptimize}
        disabled={chargingHours < 1}
      >
        Find best charging time
      </button>

      {result && (
        <div className="optimizer-result">
          <p>
            Start date: <strong>{result.from.slice(0, 10)}, at: {result.from.slice(11, 19)}</strong>
          </p>
          <p>
            End date: <strong>{result.to.slice(0, 10)}, at: {result.to.slice(11, 19)}</strong>
          </p>
          <p className="optimizer-result-clean">
            Share of clean energy: <strong>{result.avgCleanEnergy}%</strong>
          </p>
        </div>
      )}
    </div>
  )
}