import './App.css';
const { useState, useEffect } = require("react");

function App() {
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetch('http://localhost:5000/test').then(res => res.json()).then(data => {
            setMessage(data?.message);
        });
    }, []);
    return (
        <div className="App">
            <h1>{message}</h1>
        </div>
    );
}

export default App;
