import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    // BrowserRouter = voy a tener navegacion
    <BrowserRouter>
      {/* Voy a tener lista de rutas*/}
      <Routes>
        {/*// esta es mi ruta*/}
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
