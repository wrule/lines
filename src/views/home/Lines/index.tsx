import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { IChartApi, createChart } from 'lightweight-charts';
import style from './index.module.scss';

interface LinePoint {
  type: string;
  time: string | number;
  value?: number;
  [key: string]: any;
}

const mockData =
  Array(2).fill(0).map((_, index) => `类型${index + 1}`)
    .map((type) => Array(100).fill(0).map((_, index) => ({
      type,
      time: dayjs('2023-01-01').add(index, 'days').format('YYYY-MM-DD'),
      value: Math.random() * 100,
    }))).flat();
console.log(mockData);

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
      const lineSeries = chart.addLineSeries({
        color: 'red',
        lineWidth: 2,
      });
      lineSeries.setData(mockData);
      chartRef.current = chart;
    }
  }, []);

  return <div ref={selfRef} className={style.com}></div>;
}
