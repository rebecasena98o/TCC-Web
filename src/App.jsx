import React, { useState } from "react";
import TccRoutesApp from "./routes/TccRoutesApp";
import "./style/StyleGlobal.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <TccRoutesApp setUser={setUser} user={user} />
    </div>
  );
}

export default App;