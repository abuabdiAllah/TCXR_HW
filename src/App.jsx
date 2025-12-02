import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import LandingPage from "./pages/LandingPage";
import InstitutionList from "./pages/InstitutionList";
import StudentList from "./pages/StudentList";
import InstitutionStudents from "./pages/InstitutionStudents";
import Dashboard from "./pages/Dashboard";
import { DataProvider } from "./context/DataContext";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DataProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/allStudents" element={<StudentList />} />
            <Route path="/institutions" element={<InstitutionList />} />
            <Route path="/institution/:institutionName/students" element={<InstitutionStudents />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}