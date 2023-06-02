import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/personalinfo" element={<Home />}></Route>
          <Route path="/education" element={<Home />}></Route>
          <Route path="/work" element={<Home />}></Route>
          <Route path="/digitalskills" element={<Home />}></Route>
          <Route path="/languageskills" element={<Home />}></Route>
          <Route path="/intern" element={<Home />}></Route>
          <Route path="/conference" element={<Home />}></Route>
          <Route path="/certificate" element={<Home />}></Route>
          <Route path="/hobby" element={<Home />}></Route>
          <Route path="/social" element={<Home />}></Route>
          <Route path="/reference" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
