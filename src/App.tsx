import { useState } from 'react';
import AppStyles from './App.module.css';
import Output from './Output';

function App() {
  const [input, setInput] = useState<string>('');
  return (
    <div className={AppStyles.Wrapper}>
      <textarea className={AppStyles.TextArea} onChange={(e) => setInput(e.target.value)} />
      <Output input={input} />
    </div>
  );
}

export default App;
