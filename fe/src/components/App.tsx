import * as React from 'react';
import { Suspense, lazy } from "react";
import { Button } from 'antd';
import styles from './index.module.less';

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const Content = lazy(async () => {
  await sleep(5000);
  return import("./Content");
});

export const App: React.FC<{}> = () => {
  const [c, setC] = React.useState(0);

  return (
    <div>
      <Button onClick={() => {
        setC(c + 1);
      }}>add</Button>
      <div className={styles.container}>value: {c}</div>
      <Suspense>
        <Content />
      </Suspense>
    </div>
  )
};
