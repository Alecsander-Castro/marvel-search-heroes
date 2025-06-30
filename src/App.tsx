import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import HeroPage from "./pages/hero-page/HeroPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heroes-page/:id" element={<HeroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
