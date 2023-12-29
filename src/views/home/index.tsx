import { Button, Row } from 'antd';
import style from './index.module.scss';
import { Lines } from './Lines';
import { useEffect, useState } from 'react';

const LINE_MAX = 5;

function newPoints(num: number) {
  const time = Date.now();
  return Array(num).fill(0).map((_, index) => ({
    type: `类型${index + 1}`,
    time, value: Math.random() * 100,
  }));
}

export
function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const appendData = newPoints(LINE_MAX);
      const newData = [...data, ...appendData];
      console.log(newData.length, appendData);
      setData(newData);
    }, 2000);
    return () => clearTimeout(timer);
  }, [data]);

  return <div className={style.com}>
    <Lines />
  </div>;
}
