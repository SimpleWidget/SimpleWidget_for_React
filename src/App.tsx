import { useState } from 'react';
import SButton from './components/base/button/button';
import SSelect from './components/base/select/select';
import SOption from './components/base/option/option';
import STable from './components/base/table/table';
import SBadge from './components/base/badge/badge';
import STag from './components/base/tag/tag';
import './App.css';

interface TableColumn {
  key?: string;
  title: string;
  width?: string | number;
}

function App() {
  const [selectValue, setSelectValue] = useState<string>('');

  const tableData = [
    { name: '张三', age: 25, city: '北京' },
    { name: '李四', age: 30, city: '上海' },
    { name: '王五', age: 28, city: '广州' },
  ];

  const tableColumns: TableColumn[] = [
    { key: 'name', title: '姓名', width: 120 },
    { key: 'age', title: '年龄', width: 100 },
    { key: 'city', title: '城市', width: 150 },
  ];

  return (
    <div className="demo">
      <h1>SimpleWidget for React</h1>

      <h3>Button</h3>
      <SButton type="primary">Primary</SButton>
      <SButton type="success">Success</SButton>
      <SButton type="danger">Danger</SButton>

      <h3>Select</h3>
      <SSelect value={selectValue} onChange={(val) => setSelectValue(val as string)} placeholder="请选择">
        <SOption value="1" label="选项一" />
        <SOption value="2" label="选项二" />
        <SOption value="3" label="选项三" />
      </SSelect>

      <h3>Table</h3>
      <STable data={tableData} columns={tableColumns} border stripe hover select num />

      <h3>Badge</h3>
      <SBadge value="5" />
      <SBadge value={100} max={99} type="success" />

      <h3>Tag</h3>
      <STag>标签一</STag>
      <STag type="success">成功标签</STag>
      <STag type="danger" close>可关闭</STag>
    </div>
  );
}

export default App;