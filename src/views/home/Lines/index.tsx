import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { IChartApi, createChart } from 'lightweight-charts';
import randomColor from 'randomcolor';
import style from './index.module.scss';
import { Tooltip } from 'antd';

interface LinePoint {
  type: string;
  time: string;
  value: number;
  color?: string;
  [key: string]: any;
}

const mockData =
  Array(5).fill(0).map((_, index) => `类型${index + 1}`)
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

function hash(str: string) {
  let hash = 5381, i = str.length;
  while (i) hash = (hash * 33) ^ str.charCodeAt(--i);
  return hash >>> 0;
}

function uuid() {
  const unit = 6;
  const hash1 = hash(Date.now().toString() + Math.random().toString()).toString().slice(0, unit).padStart(unit, '0');
  const hash2 = hash(Math.random().toString()).toString().slice(0, unit).padStart(unit, '0');
  const hash3 = hash(Math.random().toString()).toString().slice(0, unit).padStart(unit, '0');
  return hash1 + hash2 + hash3;
}

export
function Lines(props: {
  width?: number,
  height?: number,
  dataSource?: LinePoint[],
}) {
  const uuidRef = useRef<string>(uuid());
  const selfRef = useRef<HTMLDivElement>();
  const chartRef = useRef<IChartApi>();

  const readTypes = () => {
    try {
      return JSON.parse(sessionStorage.getItem(`lines-${uuidRef.current}-types`) || '[]');
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const saveTypes = (types: string[]) => {
    sessionStorage.setItem(`lines-${uuidRef.current}-types`, JSON.stringify(Array.from(new Set([
      ...readTypes(),
      ...types,
    ]))));
  };

  useEffect(() => {
    console.log(uuidRef);
    if (!chartRef.current) {
      const chart = createChart(selfRef.current, {
        width: props.width,
        height: props.height ?? 220,
      });
      lines(mockData).forEach((line) => {
        console.log(line[0].type);
        chart.addLineSeries({
          lineWidth: 2,
          color: line[0].color ?? randomColor({
            luminosity: 'dark',
            seed: hash(line[0].type),
          }),
        }).setData(line);
      });
      chartRef.current = chart;
    }
  }, []);

  return <div className={style.com}>
    <div ref={selfRef}></div>
    <div className={style.legends_wrapper}>
      <ul className={style.legends}>
        {Array(100).fill(0).map((_, index) => `类型2哈嘎嘎嘎嘎你好你好你好你好你好你好你好你好你好${index}`).map((type) => <li>
          <span></span>
          <Tooltip title={type} mouseEnterDelay={0.6}>{<span>{type}</span>}</Tooltip>
        </li>)}
      </ul>
    </div>
  </div>;
}
