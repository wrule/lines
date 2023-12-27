import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { IChartApi, createChart } from 'lightweight-charts';
import style from './index.module.scss';

const mockData = Array(200).fill(0).map((_, index) => ({
  time: dayjs('2023-01-01').add(index, 'days').format('YYYY-MM-DD'),
  value: Math.random() * 100,
})) as any;

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
      });
      lineSeries.setData(mockData);
      chartRef.current = chart;
    }
  }, []);

  return <div ref={selfRef} className={style.com}></div>;
}
