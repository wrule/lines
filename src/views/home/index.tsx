import { Button, Row } from 'antd';
import style from './index.module.scss';
import { Lines } from './Lines';

const LINE_MAX = 5;

function newPoints(num: number) {
  const time = Date.now();
  return Array(LINE_MAX).fill(0).map((_, index) => `类型${index + 1}`)
    .map((type) => Array(num).fill(0).map(() => ({
      type, time, value: Math.random() * 100,
    }))).flat();
}

export
function Home() {
  return <div className={style.com}>
    {/* <Lines /> */}
    {/* <Row>
      <Button type="primary">你好，世界</Button>
    </Row> */}
  </div>;
}
