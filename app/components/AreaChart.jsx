"use client";

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const productSales = [
  {
    name: "Jan",
    product1: 4000,
    product2: 2400,
    product3: 1000,
  },
  {
    name: "Feb",
    product1: 3000,
    product2: 2210,
    product3: 2000,
  },
  {
    name: "Mar",
    product1: 2000,
    product2: 2290,
    product3: 4000,
  },
  {
    name: "Apr",
    product1: 2780,
    product2: 2000,
    product3: 5000,
  },
  {
    name: "May",
    product1: 1890,
    product2: 2181,
    product3: 2000,
  },
  {
    name: "Jun",
    product1: 2390,
    product2: 2500,
    product3: 6000,
  },
];

function AreaChartUI({ dataSet, activeLine }) {
  if (!activeLine.eur && !activeLine.usd && !activeLine.cny)
    return (
      <div className=" w-full h-full flex justify-center items-center text-xl">
        Выберите валюту
      </div>
    );

  if (!dataSet?.length)
    return (
      <div className=" w-full h-full flex justify-center items-center text-xl">
        Нет данных
      </div>
    );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={dataSet}>
        <Legend />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {activeLine.eur && (
          <Line dataKey="eur" type="monotone" stroke="#068add" fill="#068add" />
        )}
        {activeLine.usd && (
          <Line dataKey="usd" type="monotone" stroke="#9455d3" fill="#9455d3" />
        )}
        {activeLine.cny && (
          <Line dataKey="cny" type="monotone" stroke="#19c964" fill="#19c964" />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-transparent backdrop-blur-sm flex flex-col gap-4 rounded-lg border">
        <p className="text-medium text-lg">{label}</p>
        {payload.map((pld) => (
          <div key={pld.dataKey} className="flex gap-2 items-center">
            <p style={{ color: pld.fill }}>{pld.dataKey}</p>
            <p style={{ color: pld.fill }}>{pld.value.toFixed(4)}</p>
          </div>
        ))}
      </div>
    );
  }
};

export default AreaChartUI;
