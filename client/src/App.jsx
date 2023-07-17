import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cha from "./components/chat/Main";
import Home from "./components/landing/Home";
import Signup from "./components/landing/Signup";
import { createContext } from "react";
import "./style.css";

export const navContext = createContext();
function App() {
  const [privateNavigateSmall, setPrivateNavigateSmall] = useState(false);
  const [groupNavigateSmall, setGroupNavigateSmall] = useState(false);
  return (
    <navContext.Provider
      value={{ privateNavigateSmall, setPrivateNavigateSmall, groupNavigateSmall, setGroupNavigateSmall }}
    >
      <div className="h-[100vh] bottom-10">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          {window.localStorage.getItem("jwt") && (
            <Route path="/chat" element={<Cha currentUser={window.localStorage.getItem("user")} />}></Route>
          )}
        </Routes>
      </div>
    </navContext.Provider>
  );
}

export default App;
