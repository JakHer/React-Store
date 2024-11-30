import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
    </Routes>
  </>
);

export default App;
