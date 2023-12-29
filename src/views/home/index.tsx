import { Button, Row } from 'antd';
import style from './index.module.scss';
import { Lines } from './Lines';
import { useEffect } from 'react';

function newPoints(num = 5) {
  const time = Date.now();
  return Array(num).fill(0).map((_, index) => ({
    type: `类型${index + 1}`,
    time, value: Math.random() * 100,
  }));
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
