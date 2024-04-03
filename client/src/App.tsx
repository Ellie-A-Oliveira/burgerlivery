import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Hamburgers from "./pages/Hamburgers/Hamburgers";
import { OrderContextProvider } from "./context/OrderContext";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/hamburgers"
          element={<OrderContextProvider><Hamburgers /></OrderContextProvider>}
        />
      </Routes>
    </BrowserRouter>
  );
}
