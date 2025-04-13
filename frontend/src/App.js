// frontend/src/App.js
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/").then((res) => {
      setMsg(res.data.message);
    });
  }, []);

  return <h1>{msg}</h1>;
}

export default App;
