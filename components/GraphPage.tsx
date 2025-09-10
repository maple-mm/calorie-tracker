import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useCalorie } from '../context/CalorieDataContext';

const GraphPage: React.FC = () => {
  const { calorieData } = useCalorie();

  const chartData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      const monthDay = d.toLocaleDateString('ja-JP', {
        month: 'numeric',
        day: 'numeric',
      });

      const record = calorieData.get(dateString);
      data.push({
        name: monthDay,
        摂取カロリー: record?.intake || 0,
        消費カロリー: record?.expenditure || 0,
        基礎代謝: record?.basalMetabolism || 0,
      });
    }
    return data;
  }, [calorieData]);

  const legendPayload = [
    { value: '摂取カロリー', type: 'square', color: '#ef4444' },
    { value: '消費カロリー', type: 'square', color: '#3b82f6' },
    { value: '基礎代謝', type: 'square', color: '#22c55e' },
  ];

  const CustomLegend: React.FC = () => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
      {legendPayload.map((entry, index) => (
        <div
          key={`item-${index}`}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span
            style={{
              backgroundColor: entry.color,
              width: '10px',
              height: '10px',
              display: 'inline-block',
              marginRight: '5px',
            }}
          ></span>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-orange-500">
        過去7日間の記録
      </h1>
      <div className="h-80 w-full rounded-xl bg-white p-4 shadow-md">
        {chartData.some(
          (d) => d.摂取カロリー > 0 || d.消費カロリー > 0 || d.基礎代謝 > 0,
        ) ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#fde68a" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#737373', fontSize: 12 }}
              />
              <YAxis tick={{ fill: '#737373', fontSize: 12 }} />
              <Tooltip
                itemSorter={(item) => {
                  const order = ['摂取カロリー', '消費カロリー', '基礎代謝'];
                  return order.indexOf(item.dataKey as string);
                }}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #fdba74',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend
                content={<CustomLegend />}
                wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
              />
              <Bar
                dataKey="摂取カロリー"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
              <Bar dataKey="基礎代謝" stackId="a" fill="#22c55e" />
              <Bar
                dataKey="消費カロリー"
                stackId="a"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            データがありません。まずは記録ページから入力してください。
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphPage;
