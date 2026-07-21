import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Button from "./components/Button/Button";
import Home from "./pages/Home/Home";
import Contato from "./pages/Contato/Contato";
import News from "./pages/News/News";
import Handebol from "./pages/Handebol/Handebol";
import Volleyball from "./pages/Volleyball/Volleyball";
import Tabletennis from "./pages/Tabletennis/Tabletennis";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-linear-to-r from-blue-950 via-blue-900 to-blue-950">
      <Header
        title="LOGOTIPO"
        navigationLinks={[
          { name: "HOME", link: "/" },
          { name: "CONTATO", link: "/Contato" },
          { name: "FAVORITOS", link: "/Favoritos" },
          { name: "NEWS", link: "/News" },
        ]}
      />

      <main className="flex-1 w-full bg-linear-to-r from-blue-950 via-blue-900 to-blue-950 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contato" element={<Contato />} />
          <Route path="/News" element={<News />} />
          <Route path="/Button" element={<Button />} />
          <Route path="/Handebol" element={<Handebol />} />
          <Route path="/Volleyball" element={<Volleyball />} />
          <Route path="/Tabletennis" element={<Tabletennis />} />

          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold text-white">
                  404 - página não encontrada
                </h1>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
