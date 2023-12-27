import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { IChartApi, ISeriesApi, createChart } from 'lightweight-charts';
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

interface SeriesStore {
  [type: string]: ISeriesApi<'Line'>;
}

const mockData: LinePoint[] =
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
  const storeRef = useRef<SeriesStore>({ });

  const removeSeries = (type: string) => {
    const series = storeRef.current[type];
    if (series) {
      try {
        chartRef.current.removeSeries(series);
      } catch (error) {
        console.error(error);
        return;
      }
    }
    delete storeRef.current[type];
  };

  const addSeries = (type: string) => {
    const points = mockData.filter((point) => point.type === type);
    if (points.length < 1) return;
    const series = chartRef.current.addLineSeries({
      lineWidth: 2,
      color: points[0].color ?? typeColor(points[0].type),
    });
    series.setData(points);
    removeSeries(type);
    storeRef.current[type] = series;
    return series;
  };

  const [types, setTypes] = useState<string[]>([]);

  const typesKey = () => `lines-${uuidRef.current}-types`;

  const typeColor = (type: string) => randomColor({
    luminosity: 'dark',
    seed: hash(type),
  });

  const readTypes = () => {
    try {
      return JSON.parse(sessionStorage.getItem(typesKey()) || '[]');
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const saveTypes = (types: string[]) => {
    const newTypes = Array.from(new Set([
      ...readTypes(),
      ...types,
    ]));
    setTypes(newTypes);
    sessionStorage.setItem(typesKey(), JSON.stringify(newTypes));
  };

  useEffect(() => {
    console.log(uuidRef);
    if (!chartRef.current) {
      const chart = createChart(selfRef.current, {
        width: props.width,
        height: props.height ?? 220,
      });
      chartRef.current = chart;
      Array.from(new Set(mockData.map((point) => point.type))).forEach((type) => addSeries(type));
    }
  }, []);

  return <div className={style.com}>
    <div ref={selfRef}></div>
    <div className={style.legends_wrapper}>
      <ul className={style.legends}>
        {types.map((type) => <li onClick={() => {
          removeSeries(type);
        }}>
          <span style={{ backgroundColor: typeColor(type) }}></span>
          <Tooltip title={type} mouseEnterDelay={0.6}>{<span>{type}</span>}</Tooltip>
        </li>)}
      </ul>
    </div>
  </div>;
}
