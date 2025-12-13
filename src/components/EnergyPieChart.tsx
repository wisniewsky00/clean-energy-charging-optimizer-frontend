import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import type { PieLabelRenderProps } from "recharts";
import type { EnergyMixSummary } from "../types"
import './EnergyPieChart.css';

interface EnergyPieChartProps {
  day: EnergyMixSummary;
}

const COLORS = [
  "#FF6384", "#36A2EB", "#ffc532ff",
  "#4BC0C0", "#9966FF", "#FF8042",
  "#66CC99", "#CC6666", "#6699CC"
];


const renderCustomizedLabel = ({
  cx, cy, midAngle, outerRadius, value
}: PieLabelRenderProps) => {
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    outerRadius === undefined ||
    value === undefined
  ) {
    return null;
  }
  const RADIAN = Math.PI / 180;

  const radius = outerRadius + 38;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontWeight: "500", fontSize: "14px" }}
    >
      {value + '%'}
    </text>
  );
};

export function EnergyPieChart({ day }: EnergyPieChartProps) {
  const chartData = transformDayToChartData(day);

  return (
    <div className="energy-pie">

      <div className="energy-pie-date">
        {formatDate(day.from)}
      </div>

      <div className="energy-pie-chart">
        <ResponsiveContainer width="100%" aspect={1}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius="60%"
              label={renderCustomizedLabel}
              labelLine
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number, name: string) => [`${value}%`, name]}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#333", fontWeight: 600, fontSize: 15, marginTop: 2 }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="energy-pie-clean">
        Share of clean energy: <strong>{day.avgCleanEnergy}%</strong>
      </div>

    </div>
  );
}


function transformDayToChartData(day: EnergyMixSummary) {
  const entries = [
    { name: "Gas", value: day.avgGas },
    { name: "Coal", value: day.avgCoal },
    { name: "Biomass", value: day.avgBiomass },
    { name: "Nuclear", value: day.avgNuclear },
    { name: "Hydro", value: day.avgHydro },
    { name: "Imports", value: day.avgImports },
    { name: "Other", value: day.avgOther },
    { name: "Wind", value: day.avgWind },
    { name: "Solar", value: day.avgSolar }
  ];

  return entries.filter(e => e.value !== 0);
}

function formatDate(from: string) {
  return from.split("T")[0];
}