import { Button, Row } from 'antd';
import style from './index.module.scss';
import { Lines } from './Lines';

export
function Home() {
  return <div className={style.com}>
    <Lines />
    {/* <Row>
      <Button type="primary">你好，世界</Button>
    </Row> */}
  </div>;
}
