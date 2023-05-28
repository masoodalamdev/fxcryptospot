import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, LabelList } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieChartComponent() {
  return (
    <ResponsiveContainer width='100%'  aspect={1} >
    <PieChart width={200} height={200}>
       <LabelList dataKey='value'/>
      <Pie
        data={data}
        cx={175}
        cy={75}
        innerRadius={25}
        outerRadius={50}
        fill="#8884d8"
        paddingAngle={1}
        dataKey="value"
        label="name"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
     
    </PieChart>
    </ResponsiveContainer>

  );
}
