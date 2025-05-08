import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import HabitFormPage from "./pages/HabitFormPage";
import EstadisticasPage from "./pages/EstadisticasPage";
import CalendarPage from "./pages/CalendarPage";
import { HabitsProvider } from "./context/HabitsContext";

function App() {
  return (
    <HabitsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/newhabit" element={<HabitFormPage />} />
          <Route path="/editar-habito/:id" element={<HabitFormPage />} />
          <Route path="/statistics" element={<EstadisticasPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
    </HabitsProvider>
  );
}

export default App;
