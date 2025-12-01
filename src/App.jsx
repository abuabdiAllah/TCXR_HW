import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import LandingPage from "./pages/LandingPage";
import InstitutionList from "./pages/InstitutionList";
import StudentList from "./pages/StudentList";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/allStudents" element={<StudentList />} />
          <Route path="/institutions" element={<InstitutionList />} />
          <Route path="/:institution/studentlist" element={<h1>new page here</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}