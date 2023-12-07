'use client';
import { Card } from '@radix-ui/themes';
import React from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { name: 'Open', value: open },
    { name: 'InProgress', value: inProgress },
    { name: 'Closed', value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            barSize={80}
            style={{ fill: 'var(--accent-9' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssuesChart;
