import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Profile from "./pages/Profile";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Success from "./pages/PaymentPage/Success";
import Cancel from "./pages/PaymentPage/Cancel";
import OrderOnline from "./components/OrderOnline/Order";
import Whatsapp from "./components/Whatsapp";
import OrderPage from "./pages/OrderPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  
  return (
    <BrowserRouter>
      <ScrollToTop />  {/* ✅ Har route change par scroll karega */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Whatsapp />
    </BrowserRouter>
  );
}

export default App;
