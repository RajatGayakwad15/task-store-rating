"use client";
import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  Tooltip
} from "recharts";

type Props = {};

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 }
];

const calculateAverage = () => {
  const sum = data.reduce((acc, item) => acc + item.total, 0);
  return (sum / data.length).toFixed(2);
};

export default function BarChart({}: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          cursor={{ fill: "transparent" }} 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white text-black p-2 shadow-md rounded-md">
                  <p className="text-sm font-bold">Month: {label}</p>
                  <p className="text-sm">Total: ${payload[0].value}</p>
                  <p className="text-sm">Average: ${calculateAverage()}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey={"total"} fill="#FFFFFF" radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
