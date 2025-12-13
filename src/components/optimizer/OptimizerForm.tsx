import { useState } from "react"
import './OptimizerForm.css';

export function OptimizerForm() {

  const [chargingHours, setChargingHours] = useState<number>(0);
  const [result, setResult] = useState<string>('');

  const handleOptimize = () => {
    console.log("Charging duration: ", chargingHours, "hours");

    setResult("Best charging window: 02:00 – 05:00")
  }

  return(
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
      >
        Find best charging time
      </button>

      {result && (
          <div className="optimizer-result">
            <strong>{result}</strong>
          </div>
      )}
    </div>
  )
}