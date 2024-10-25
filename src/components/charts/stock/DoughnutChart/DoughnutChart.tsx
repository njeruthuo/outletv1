import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import {v4 as uuidv4} from 'uuid';
import styles from './styles/DoughnutChart.module.scss';
import {Box} from '@mui/material';
import ChartTooltip from './ChartToolTip';
import { cn } from '@/lib/utils';

interface DataItem {
  name: string;
  amount: number;
}

interface ColorsItem {
  start: string;
  end: string;
  middle: string;
}

const DoughnutChart = ({
  data,
  colors,
  totalCount,
  text
}: {
  data: DataItem[];
  colors: ColorsItem[];
  totalCount?: number;
  showTotal?: boolean;
  text?:string
}) => {
  const idBlock = uuidv4();
  return (
    <div className={cn(styles.pieChartWrapper, "border rounded-md pb-[38px]")}>
    
    <ResponsiveContainer width={'99%'} aspect={1.2}>
        <PieChart>
        <Legend
                  height={36}
                  iconType="circle"
                  layout="horizontal"
                  verticalAlign="top"
                  iconSize={10}
                  padding={5}
        
                />
        <Tooltip content={<ChartTooltip />} />
          <defs>
            {data.map((entry, index) => (
              <linearGradient
                key={index}
                id={`${idBlock}-${index}`}
                gradientUnits="userSpaceOnUse"
                gradientTransform="rotate(65)">
                <stop
                  offset="0%"
                  stopColor={colors[index % colors.length].start}
                />
                <stop
                  offset="100%"
                  stopColor={colors[index % colors.length].end}
                />
              </linearGradient>
            ))}
          </defs>
          <text
            x="50%"
            y="50%"
            style={{
              fontSize: '32px',
              fontWeight: '600',
            }}
            textAnchor="middle"
            dominantBaseline="middle">
            {totalCount}
          </text>
          <text
            x="50%"
            y="60%"
            style={{
              fontSize: '12px',
              fontWeight: '400',
            }}
            textAnchor="middle"
            dominantBaseline="middle">
               {text}
          </text>
          <Pie
            data={data}
            dataKey="amount"
            startAngle={-270}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index,
            }: {
              cx: number;
              cy: number;
              midAngle: number;
              innerRadius: number;
              outerRadius: number;
              value: number;
              index: number;
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = 10 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <g>
                  <ellipse
                    ry="22"
                    rx="22"
                    id="svg_1"
                    cy={y}
                    cx={x}
                    strokeWidth="2"
                    stroke={colors[index % colors.length].middle}
                    fill="#fff"
                  />
                  <text
                    x={x}
                    y={y}
                    fill="#333333"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="600"
                    dominantBaseline="central">
                    {value}
                  </text>
                </g>
              );
            }}
            innerRadius={60}
            outerRadius={82}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#${idBlock}-${index})`} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoughnutChart;
