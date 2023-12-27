import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { IChartApi, createChart } from 'lightweight-charts';
import style from './index.module.scss';

interface LinePoint {
  type: string;
  time: string;
  value: number;
  color?: string;
  [key: string]: any;
}

const mockData =
  Array(20).fill(0).map((_, index) => `类型${index + 1}`)
    .map((type) => Array(100).fill(0).map((_, index) => ({
      type,
      time: dayjs('2023-01-01').add(index, 'days').format('YYYY-MM-DD'),
      value: Math.random() * 100,
    }))).flat();
console.log(lines(mockData));

function lines(points: LinePoint[]) {
  const types = Array.from(new Set(points.map((point) => point.type)));
  types.sort();
  return types.map((type) => points.filter((point) => point.type === type));
}

export
function Lines(props: {
  width?: number,
  height?: number,
}) {
  const selfRef = useRef<HTMLDivElement>();
  const chartRef = useRef<IChartApi>();

  useEffect(() => {
    if (!chartRef.current) {
      const chart = createChart(selfRef.current, {
        width: props.width,
        height: props.height ?? 220,
      });
      lines(mockData).forEach((line) => {
        chart.addLineSeries({
          lineWidth: 2,
        }).setData(line);
      });
      chartRef.current = chart;
    }
  }, []);

  return <div ref={selfRef} className={style.com}></div>;
}
