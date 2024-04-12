import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Recommend from "./pages/Recommend";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/recommend" element={<Recommend/>} />
      </Routes>
    </div>
  );
};

export default App;
