import { Route, Routes } from "react-router-dom";
import "./App.css";
import ReactQueryPage from "./ReactQueryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReactQueryPage />} />
    </Routes>
  );
}

export default App;
