import React, { useState } from "react";
import TccRoutesApp from "./routes/TccRoutesApp";
import "./style/StyleGlobal.css";

function App() {
  const [user, setUser] = useState(null);

  return <TccRoutesApp setUser={setUser} />;
}

export default App;