import React,{useState} from "react";
import Counter from "./counter";
import Login from "./login";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

function App(){
  const [user, setUser] = useState(null)

  const handleLogout = ()=>{
 signOut(auth)
 .then(()=>{setUser(null)})
 .catch(err => alert('Logout failed: '+ err.message))
  }
  return(
    <Router>
      <Routes>
        <Route 
        path =  "/login"
        element = {<> 
          <p>Please log in to continue</p>
          <Login onLogin = {setUser}/>
          </>}
        />

        <Route
        path = "/"
        element = {user ?(<>
          <div style={{textAlign:'center'}}>
          <p>Welcome, {user.email} </p>
          <button onClick={handleLogout}>🚪 Logout</button>
          <Counter uid={user.uid}/>
         </div>

          </> ):
          (<Navigate to = "/logan" />)
        }
        />
      
      </Routes>
    </Router>
  );
}

export default App;
    