import SButton from './components/base/button/button';
import './App.css';

function App() {
  return (
    <div className="demo">
      <h1>SimpleWidget for React</h1>
      <SButton type="primary">Primary</SButton>
      <SButton type="success">Success</SButton>
      <SButton type="danger">Danger</SButton>
      <SButton type="warning">Warning</SButton>
    </div>
  );
}

export default App;