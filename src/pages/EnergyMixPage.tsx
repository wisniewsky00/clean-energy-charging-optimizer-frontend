import { useEffect, useState } from "react";
import { energyMixApi } from "../api/energyMixApi";
import { EnergyPieChartGrid } from "../components/EnergyPieChartGrid";
import './EnergyMixPage.css';
import { CleanEnergyChargingOptimizer } from "../components/optimizer/CleanEnergyChargingOptimizer";

export function EnergyMixPage() {

  const [data, setData] = useState(null);
  useEffect(() => {

    const fetchData = async () => {
      const response = await energyMixApi.get("/energy/mix/summary");
      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <div className="energy-mix-page">
      <header className="energy-mix-header">
        <h1>UK Energy Mix – Current & Forecast Overview</h1>
        <h2>
          Breakdown of current and forecasted electricity generation sources
          in the United Kingdom
        </h2>
      </header>

      {data && <EnergyPieChartGrid data={data} />}

      <CleanEnergyChargingOptimizer />      
    </div>
  );
}