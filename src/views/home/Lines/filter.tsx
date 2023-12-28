import React, { useRef } from 'react';
import { Button, Input, InputRef, Popover, Space, Tooltip } from 'antd';
import filterImage from './filter.svg';
import style from './filter.module.scss';

export
function Filter() {
  const input = useRef<InputRef>();

  return <Popover
    title="过滤"
    trigger="click"
    placement="bottomLeft"
    content={<Input.Group compact>
      <Input
        ref={input}
        allowClear
        size="small"
        style={{ width: '250px' }}
        placeholder="请输入关键字或正则，以空格分隔"
      />
      <Button size="small" type="primary">应用</Button>
    </Input.Group>}
    onOpenChange={(visible) => {
      if (visible) setTimeout(() => input.current?.focus(), 0);
    }}>
    <Tooltip title="更多操作" mouseEnterDelay={1}>
      <div className={style.com}>
        <img src={filterImage} />
      </div>
    </Tooltip>
  </Popover>;
}
