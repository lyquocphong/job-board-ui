import NotFoundPage from "./pages/NotFoundPage";
import JobViewPage from "./pages/JobViewPage";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import MainLayout from "./components/Layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="" element={<MainLayout />}>
        <Route index Component={DashboardPage} />
        <Route path="/job/:id" Component={JobViewPage} />
        <Route path="*" Component={NotFoundPage} />
      </Route>
    </Routes>
  );
}

export default App;
