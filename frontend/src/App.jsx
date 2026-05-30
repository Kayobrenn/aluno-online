import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"

import AlunosPage from "./pages/AlunosPage"
import DashboardPage from "./pages/DashboardPage.jsx"
import DisciplinasPage from "./pages/DisciplinasPage"
import HistoricoPage from "./pages/HistoricoPage"
import ProfessoresPage from "./pages/ProfessorPage.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/alunos" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/alunos" element={<AlunosPage />} />
                    <Route path="/professores" element={<ProfessoresPage />} />
                    <Route path="/disciplinas" element={<DisciplinasPage />} />
                    <Route path="/historico" element={<HistoricoPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

