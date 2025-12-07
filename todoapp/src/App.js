import { useEffect, useState } from 'react';
import './App.css';

function App() {
   const [allTasks, setAllTasks] = useState([]);
   const [task, setTask] = useState("");
   const [isEditable, setIsEditable] = useState(false); 
   const [editTask, setEditTask] = useState(null);
   const [completedTasks, setCompletedTasks] = useState([]);
   const [showCompleted, setShowCompleted] = useState(false);
   const [showIncomplete, setShowIncomplete] = useState(false);
   const [incompleteTasks, setIncompleteTasks] = useState([]);
   const [taskList, setTaskList] = useState(allTasks)

   
   function handleChange(e){
     setTask(e.target.value);
   }


   useEffect(() =>{
      if(showCompleted){
        setTaskList(completedTasks);
      }else if(showIncomplete){
        setTaskList(incompleteTasks);
      }else{
        setTaskList(allTasks);
      }
   }, [showCompleted, showIncomplete, allTasks]);
   
   console.log(allTasks);

   function handleClick(){

     if(task !== ""){
      const newTask = {
        id: allTasks.length + 1,
        taskname: task,
        editStatus: false,
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
       setCompletedTasks(completed);
        setShowCompleted(true);
        setShowIncomplete(false);
   }

   function getIncompletedTasks(){
       const Incompleted  = allTasks.filter((item) => item.status === false);
       setIncompleteTasks(Incompleted);
      setShowIncomplete(true);
      setShowCompleted(false);
   }

   function handleResetFilter(){
      setShowCompleted(false);
      setShowIncomplete(false);
      setTaskList(allTasks);
   }

   function handleCompleteAll(){
     const newTasks = allTasks.map((item,index) => {
      item.status = true;
      return item;
     })
      setAllTasks(newTasks);
   }

    function handleIncompleteAll(){
     const newTasks = allTasks.map((item,index) => {
      item.status = false;
      return item;
     })
      setAllTasks(newTasks);
   }

   function handleDelCompleteAll(){
      const newAllTasks = allTasks.filter((item,i) => item.status === false);
      setAllTasks(newAllTasks);
   }

   function handleDelIncompleteAll(){
      const newAllTasks = allTasks.filter((item,i) => item.status === true);
      setAllTasks(newAllTasks);
   }

   function handleEdit(index){
    const newTasks = [...allTasks];
    newTasks[index].editStatus = true;
    setAllTasks(newTasks);
    setIsEditable(true);
    setEditTask(allTasks[index].taskname);
   }

   function handleEditChange(index,e){
    const editTask = [...allTasks];
    editTask[index].taskname = e.target.value;
    setEditTask(e.target.value);
   }

   function handleUpdateTask(index){
    const newTasks = [...allTasks];
    newTasks[index].taskname = editTask;
    setAllTasks(newTasks);
    setIsEditable(false);
   }

 

 return (
        <div className="App">
          <div className="todo-container">
            <div className="todo-header">
              <h1>To Do App</h1>
            </div>
            <div className="todo-input-row">
              <input
                type="text"
                placeholder="Add Task"
                value={task}
                onChange={handleChange}
              />
              <button onClick={handleClick}>Add</button>
            </div>
            <h3>Filter By</h3>
            <div className="todo-filters">
              
              <button onClick={getCompletedTasks} className={showCompleted ? "active" : "" }>Completed Task</button>
              <button onClick={getIncompletedTasks} className={showIncomplete ? "active" : "" }>Pending Task</button>
              <button onClick={() => handleResetFilter()}>Reset</button>
            </div>
            <div className="todo-list">
              {taskList.length === 0 ? (
                <p style={{ color: '#a5b4fc', fontStyle: 'italic', margin: '1rem 0' }}>No tasks yet. Add a task!</p>
              ) : (
                taskList.map((item, index) => (
                  <div
                    className={`todo-item${item.status ? ' completed' : ''}`}
                    key={item.id}
                  >
                    <input
                      type="checkbox"
                      checked={item.status}
                      onChange={() => handleStatusChange(index)}
                    />
                    {
                      taskList[index].editStatus
                      ?
                      <input
                          type="text"
                          value={editTask}
                          onChange={(e) => handleEditChange(index,e)}
                        />
                      :
                      <p>{item.taskname}</p>
                    }
                    
                    <button onClick={() => handleDelete(index)}>Delete</button>
                    {
                      isEditable ? (
                      
                         
                          <button onClick={() => handleUpdateTask(index)} className='update-btn'>Update</button>
                        
                      ) : (
                        <button onClick={() => handleEdit(index)} className='edit-btn'>Edit</button>
                      )
                    }
                  </div>
                ))
              )}
            </div>
             <div className="todo-actions">
              <button onClick={handleCompleteAll}>Complete All Tasks</button>
              <button onClick={handleIncompleteAll}>Incomplete All Tasks</button>
              <button onClick={handleDelCompleteAll}>Delete All Completed Tasks</button>
              <button onClick={handleDelIncompleteAll}>Delete All Incomplete Tasks</button>
              <button onClick={() => setAllTasks([])} className='clearAll'>Clear All Tasks</button>
            </div>
          </div>
        </div>
      );
}

export default App;
