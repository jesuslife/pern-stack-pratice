import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const response = await fetch("http://localhost:4000/tasks");
    const data = await response.json();
    // console.log(data)
    setTasks(data);
  };

  const handleDelete = async(id) => {

    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      })
  
      setTasks(tasks.filter(task => task.id !== id));


      // const data = await result.json();
      // console.log(result)
    }catch(error){
      console.log(error)
    };

  }
  
  useEffect(() => {
    loadTasks();
  }, []);
  return (
    <>
      <h1>Task list</h1>
      {tasks.map((task) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
          key={task.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{color: 'white'}}>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => console.log("edit")}
                
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(task.id)}
                style={{marginLeft: ".5rem"}}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
