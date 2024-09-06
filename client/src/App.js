import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Container } from "@mui/material";
import Menu from "./components/Navbar";

function App() {
  return (
    // BrowserRouter = voy a tener navegacion
    <BrowserRouter>
      {/* Voy a tener lista de rutas*/}
      <Menu />
      <Container>
        <Routes>
          {/*// esta es mi ruta*/}
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
