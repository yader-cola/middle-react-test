import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  return (
    <Router>
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category" element={<ProductList />} />
                    <Route path="/category/:categoryName" element={<ProductList />} />
                </Routes>
            </main>
        </div>
    </Router>
  );
}

export default App
