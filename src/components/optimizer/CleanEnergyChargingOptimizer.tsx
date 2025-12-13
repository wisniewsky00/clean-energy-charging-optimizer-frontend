import { OptimizerForm } from "./OptimizerForm";
import './CleanEnergyChargingOptimizer.css';

export function CleanEnergyChargingOptimizer() {
  return (
    <div className="optimizer-container">

      <header className="optimizer-header">
        <h1>Determine the best charging time for your electric car in terms of clean energy!</h1>
        <p className="optimizer-subtitle">
          Optimization is performed for the next <strong>48 hours</strong>.
        </p>
      </header>

      <OptimizerForm />
    </div>
  )
}