import React, {useEffect, useState} from 'react';
import './App.css';
import ResidentsList from './Components/ResidentsList';
import Search from './Components/Search';
import Error from './Components/Error';
import 'h8k-components';

const title = "Hacker Dormitory";
function App() {
    const [error,setError] = useState("");
    const [residents,setResidents] = useState([]);
    const [newStudent,setNewStudent] = useState();
    useEffect(()=>{
        if(newStudent)
        setResidents([...residents,newStudent.name]);
    },[newStudent]);
  return (
    <div className="App">
        <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <Search setErrorFun={setError} updateResidentsFun={setNewStudent} />
        <Error error={error}/>
        <ResidentsList residentsList={residents}/>
      </div>
    </div>
  );
}

export default App;
