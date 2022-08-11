import Separation from "./pages/Separation/Separation";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Knight from "./pages/Knight/Knight";
import Home from "./pages/Home/Home";
import Headline from "./components/Headline/Headline";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <Router>
            <div className="App">
                <Headline />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/assessment-1" element={<Separation />} />
                    <Route path="/assessment-2" element={<Knight />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
