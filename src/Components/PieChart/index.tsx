import React from 'react';
import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight,
} from './styles';
import {
  PieChart as PieChartGraph,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface IPieChartProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

//FC = Functional component
const PieChart: React.FC<IPieChartProps> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        {data.map((indicator) => (
          <Legend key={indicator.name} color={indicator.color}>
            <div>{indicator.percent}%</div>
            <span>{indicator.name}</span>
          </Legend>
        ))}
      </LegendContainer>
    </SideLeft>

    <SideRight>
      <ResponsiveContainer>
        <PieChartGraph>
          <Pie data={data} dataKey="percent">
            {data.map((indicator) => (
              <Cell key={indicator.name} fill={indicator.color} />
            ))}
          </Pie>
        </PieChartGraph>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);
export default PieChart;
