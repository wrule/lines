import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { createChart } from 'lightweight-charts';
import style from './index.module.scss';

const mockData = Array(1000).fill(0).map((_, index) => ({
  time: dayjs('2023-01-01').add(index, 'days').format('YYYY-MM-DD'),
  value: Math.random() * 100,
}));

export
function Lines(props: {
  width?: number,
  height?: number,
}) {
  const self = useRef<HTMLDivElement>();

  useEffect(() => {
    const chart = createChart(self.current, {
      width: props.width,
      height: props.height ?? 220,
    });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(mockData);
  }, []);

  return <div ref={self} className={style.com}></div>;
}
