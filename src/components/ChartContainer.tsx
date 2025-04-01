
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bar, 
  Line,
  Pie,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  BarChart,
  LineChart,
  PieChart
} from "recharts";

export type ChartType = 'bar' | 'line' | 'pie';

interface ChartContainerProps {
  title: string;
  type: ChartType;
  data: any[];
  dataKey: string;
  categories?: string[];
  colors?: string[];
  className?: string;
}

const defaultColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const ChartContainer = ({ 
  title, 
  type, 
  data, 
  dataKey, 
  categories = ['value'], 
  colors = defaultColors,
  className 
}: ChartContainerProps) => {
  // Render the chart based on type
  const renderChart = () => {
    if (type === 'bar') {
      return (
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {categories.map((category, index) => (
            <Bar 
              key={category} 
              dataKey={category} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </BarChart>
      );
    }

    if (type === 'line') {
      return (
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {categories.map((category, index) => (
            <Line 
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      );
    }

    if (type === 'pie') {
      return (
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey={categories[0]}
            nameKey={dataKey}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
    }

    return null;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;
