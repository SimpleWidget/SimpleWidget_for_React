import { useState } from 'react';
import SButton from './components/base/button/button';
import SInput from './components/base/input/input';
import STextarea from './components/base/textarea/textarea';
import SSelect from './components/base/select/select';
import SOption from './components/base/option/option';
import SCheckbox from './components/base/checkbox/checkbox';
import { CheckboxGroup } from './components/base/checkbox/checkbox';
import SRadio from './components/base/radio/radio';
import { RadioGroup } from './components/base/radio/radio';
import SSwitch from './components/base/switch/switch';
import STable from './components/base/table/table';
import SBadge from './components/base/badge/badge';
import STag from './components/base/tag/tag';
import SAlert from './components/base/alert/alert';
import SDialog from './components/base/dialog/dialog';
import './App.css';

interface TableColumn {
  key?: string;
  title: string;
  width?: string | number;
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [radioValue, setRadioValue] = useState('');

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

      <h3>Input</h3>
      <SInput value={inputValue} onChange={setInputValue} placeholder="请输入" clear onClear={() => setInputValue('')} />

      <h3>Textarea</h3>
      <STextarea value={textareaValue} onChange={setTextareaValue} placeholder="请输入文本" rows={3} />

      <h3>Select</h3>
      <SSelect value={selectValue} onChange={(val) => setSelectValue(val as string)} placeholder="请选择">
        <SOption value="1" label="选项一" />
        <SOption value="2" label="选项二" />
        <SOption value="3" label="选项三" />
      </SSelect>

      <h3>Checkbox</h3>
      <SCheckbox value={checked} onChange={setChecked}>同意协议</SCheckbox>

      <h3>Radio</h3>
      <RadioGroup value={radioValue} onChange={setRadioValue}>
        <SRadio label="1">选项一</SRadio>
        <SRadio label="2">选项二</SRadio>
      </RadioGroup>

      <h3>Switch</h3>
      <SSwitch checked={switchValue} onChange={setSwitchValue} />

      <h3>Table</h3>
      <STable data={tableData} columns={tableColumns} border stripe hover select num />

      <h3>Badge</h3>
      <SBadge value="5" />
      <SBadge value={100} max={99} type="success" />

      <h3>Tag</h3>
      <STag>标签一</STag>
      <STag type="success">成功标签</STag>
      <STag type="danger" close onClose={() => {}}>可关闭</STag>

      <h3>Alert</h3>
      <SAlert type="success" title="成功提示">操作成功！</SAlert>

      <h3>Dialog</h3>
      <SButton type="primary" onClick={() => setDialogVisible(true)}>打开弹窗</SButton>
      <SDialog visible={dialogVisible} title="对话框标题" width={400} onClose={() => setDialogVisible(false)}>
        <p>这是对话框的内容区域</p>
      </SDialog>
    </div>
  );
}

export default App;