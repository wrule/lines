import { Button, Row } from 'antd';
import style from './index.module.scss';
import { Lines } from './Lines';
import { useEffect } from 'react';

const LINE_MAX = 5;

function newPoints() {
  const time = Date.now();
  return Array(LINE_MAX).fill(0).map((_, index) => `类型${index + 1}`)
    .map((type) => Array(1).fill(0).map(() => ({
      type, time, value: Math.random() * 100,
    }))).flat();
}

export
function Home() {
  useEffect(() => {
    console.log(newPoints());
  }, []);

  return <div className={style.com}>
    {/* <Lines /> */}
    {/* <Row>
      <Button type="primary">你好，世界</Button>
    </Row> */}
  </div>;
}
