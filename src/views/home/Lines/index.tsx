import React, { useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { DeepPartial, IChartApi, ISeriesApi, LineStyleOptions, SeriesOptionsCommon, createChart } from 'lightweight-charts';
import randomColor from 'randomcolor';
import style from './index.module.scss';
import { Affix, Input, Popover, Tooltip } from 'antd';
import filter from './filter.svg';
import { Filter } from './filter';

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
  Array(1).fill(0).map((_, index) => `类型${index + 1}`)
    .map((type) => Array(100).fill(0).map((_, index) => ({
      type,
      time: dayjs('2023-01-01').add(index, 'days').format('YYYY-MM-DD'),
      value: Math.random() * 100,
    }))).flat();

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

function distinct<T>(list: T[]) {
  const result = Array.from(new Set(list));
  result.sort();
  return result;
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

  const line = (type: string) => mockData.filter((point) => point.type === type);

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
    const points = line(type);
    if (points.length < 1) return;
    const series = chartRef.current.addLineSeries({
      lineWidth: 2,
      lineType: 2,
      color: points[0].color ?? typeColor(points[0].type),
    });
    series.setData(points);
    removeSeries(type);
    storeRef.current[type] = series;
    return series;
  };

  const updateSeries = (type: string) => {
    const series = storeRef.current[type];
    if (series) series.setData(line(type));
    else addSeries(type);
  };

  const updateSeriesOption = (
    type: string,
    options: DeepPartial<LineStyleOptions & SeriesOptionsCommon>,
  ) => {
    const series = storeRef.current[type];
    if (series) series.applyOptions(options);
  };

  // const highlightSeries = (types: string[], highlight = true) => {
  //   viewTypes.forEach((type) => {
  //     if (!types.includes(type)) updateSeriesOption(type, {
  //       color: typeColor(type, highlight ? 0.1 : 1),
  //     });
  //   });
  // };

  const updateLines = () => {
    viewTypes.forEach((type) => updateSeries(type));
    saveAllTypes(viewTypes);
  };

  //#region allTypes处理逻辑
  const [allTypes, setAllTypes] = useState<string[]>([]);

  const typesKey = () => `lines-${uuidRef.current}-types`;

  const readAllTypes = () => {
    try {
      return JSON.parse(sessionStorage.getItem(typesKey()) || '[]');
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const saveAllTypes = (types: string[]) => {
    const newTypes = distinct([...readAllTypes(), ...types]);
    sessionStorage.setItem(typesKey(), JSON.stringify(newTypes));
    setAllTypes(newTypes);
  };
  //#endregion

  //#region viewTypes处理逻辑
  const viewTypes = useMemo(() => distinct(mockData.map((point) => point.type)), [mockData]);
  //#endregion

  //#region highlightTypes处理逻辑
  const [highlightTypes, setHighlightTypes] = useState<string[]>([]);

  const highlightSeries = (types: string[], highlight = true) => {
    if (highlight) setHighlightTypes(distinct([...highlightTypes, ...types]));
    else setHighlightTypes(highlightTypes.filter((type) => !types.includes(type)));
  };
  //#endregion

  //#region enabledTypes处理逻辑
  const [enabledTypes, setEnabledTypes] = useState<string[]>([]);

  const enableSeries = (types: string[], enable = true) => {
    if (enable) {

    }
    else {

    }
  };
  //#endregion

  const typeColor = (type: string, alpha = 1) => randomColor({
    seed: hash(type),
    luminosity: 'dark',
    alpha, format: 'rgba',
  });

  useEffect(() => {
    console.log(uuidRef);
    if (!chartRef.current) {
      const chart = createChart(selfRef.current, {
        width: props.width,
        height: props.height ?? 220,
        timeScale: {
          timeVisible: true,
          tickMarkFormatter: (...args) => {
            console.log(args);
            return '55:44:88';
          },
        },
        rightPriceScale: {
          // mode: 3,
          // textColor: 'red',
        },
      });
      chartRef.current = chart;
      updateLines();
    }
  }, []);

  return <div className={style.com}>
    <div ref={selfRef}></div>
    <div className={style.legends_wrapper}>
      <Filter />
      <ul className={style.legends}>
        {allTypes.map((type) => <li
          onClick={() => {
            removeSeries(type);
          }}
          onMouseEnter={() => {
            // highlightSeries([type]);
          }}
          onMouseLeave={() => {
            // highlightSeries([type], false);
          }}>
          <span style={{ backgroundColor: typeColor(type) }}></span>
          <Tooltip title={type} mouseEnterDelay={0.6}>{<span>{type}</span>}</Tooltip>
        </li>)}
      </ul>
    </div>
  </div>;
}
