import { useEffect, useState } from 'react';
import { Lines } from './Lines';
import style from './index.module.scss';
import dayjs from 'dayjs';

const LINE_MAX = 5;

function newPoints(num: number, time?: number) {
  const pointsTime = time ?? Date.now();
  return Array(num).fill(0).map((_, index) => ({
    type: `类型${index + 1}`,
    time: pointsTime, value: Math.random() * 100,
  }));
}

export
function Home() {
  const [data, setData] = useState<any[]>(
    Array(100).fill(0).map((_, index) => newPoints(LINE_MAX, dayjs('2020-01-01').add(index, 'seconds').valueOf())).flat()
  );

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const appendData = newPoints(LINE_MAX);
  //     const newData = [...data, ...appendData];
  //     console.log(newData.length, appendData);
  //     setData(newData);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, [data]);

  return <div className={style.com}>
    <Lines dataSource={data} />
  </div>;
}
