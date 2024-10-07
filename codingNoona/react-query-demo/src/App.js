import { Route, Routes } from "react-router-dom";
import "./App.css";
import ReactQueryPage from "./ReactQueryPage";
import NormalPage from "./NormalPage";
import HomePage from "./HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/normalpage" element={<NormalPage />} />
      <Route path="/reactquery" element={<ReactQueryPage />}  />
    </Routes>
  );
}

export default App;
