import { Route, Routes } from "react-router-dom";
import Favorite from "./Favorite";
import HomePage from "./Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;
