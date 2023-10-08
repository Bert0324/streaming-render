import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { Table } from 'antd';
import img from '../../public/webpack_lifecycle.jpeg';

const Content: FC<{}> = () => {
  const [v, setV] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await (await fetch('http://localhost:8080/content.json')).json();
      setV(data);
    })();
  }, []);

  return (
    <div>
      111
      <Table 
        dataSource={v}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },
        ]}
      />
      <img src={img} style={{ width: '100px', height: '100px'}} />
    </div>
  )
}

export default Content;