import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../pages/HomePage/HomePage";
import Catalog from "../../pages/Catalog/Catalog";
import CamperDetails from "../../pages/CamperDetails/CamperDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<CamperDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
