import { useState } from 'react';
import './App.css';

function App() {
   const [allTasks, setAllTasks] = useState([]);
   const [task, setTask] = useState("");
   const [completedTasks, setCompletedTasks] = useState([]); 
   
   function handleChange(e){
     setTask(e.target.value);
   }
   
   console.log(allTasks);

   function handleClick(){

     if(task !== ""){
      const newTask = {
        id: allTasks.length + 1,
        taskname: task,
        status: false
      }
      setAllTasks([...allTasks, newTask]);
      setTask("");
     }else{
      alert("Please enter a task");
     }
      
   }

   function handleDelete(index){
      const newAllTasks = allTasks.filter((item,i) => i !== index);
      console.log(newAllTasks);
      setAllTasks(newAllTasks);
   }

   function handleStatusChange(index){
      const newTasks = [...allTasks];
      newTasks[index].status = !newTasks[index].status;
      setAllTasks(newTasks);
   }

   function getCompletedTasks(){
       const completed  = allTasks.filter((item) => item.status === true);
       setAllTasks(completed);
   }

   function getIncompletedTasks(){
       const completed  = allTasks.filter((item) => item.status === false);
       setAllTasks(completed);
   }

  return (
    <div className="App">
     <div >
      <div>
        <h1>To Do App</h1>
      </div>
      <div>
        <input 
         type="text"
         placeholder="Add Task"
         value={task}
         onChange={(e) => handleChange(e)}/>
        <button onClick={handleClick}>Add</button>
        <div>

        <button onClick={() => getCompletedTasks()}> Completed Task</button>
        <button onClick={() => getIncompletedTasks()}> Completed Task</button>
      
        </div>
        <div>
          {
            allTasks.map((item,index) =>{
              return (
                <div>
                  <input type='checkbox' checked={item.status} onChange={() => handleStatusChange(index)}/>
                  <p key={index}>{item.taskname}</p>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                  {/* <button onClick={() => handleEdit(index)}>Edit</button> */}
                </div>
              )
            })
          }
        </div>
      </div>
      
     </div>
    </div>
  );
}

export default App;
