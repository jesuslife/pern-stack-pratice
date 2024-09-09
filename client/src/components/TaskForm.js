import {
  Grid2,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate , useParams} from "react-router-dom";

export default function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // console.log(task)
    await fetch("http://localhost:4000/tasks", {
      method: "POST",
      body: JSON.stringify(task), //convierte objecto a string
      // necesario para que sepa que es un objecto json, sin headers los campos seran null
      headers: { "Content-Type": "application/json" },
    });
    // const data = await res.json(); //convierte respuesta a JSON
    // console.log(data);
    setLoading(false);
    navigate("/");
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    // console.log(task)
  };

  const loadTask = async (id) =>{
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await res.json()
    // console.log(data)
    setTask({title:data.title, description: data.description})
  };

  // hace validacion apenas y termine el componente
  useEffect(() => {
    if (params.id){
      loadTask(params.id)
      // console.log('fetch task')
    }
  }, [params.id])

  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid2 item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "white",
            // backgroundColor: '#1e272e',
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="green">
            Create task
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="write your title"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="title"
                value={task.title}
                onChange={handleChange}
              />

              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="description"
                value={task.description}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
