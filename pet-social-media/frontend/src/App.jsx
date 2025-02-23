import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api').then((response) => {
      setMessage(response.data.message);
    });
  }, []);

  return (
    <div>
      <h1>React + Flask App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
