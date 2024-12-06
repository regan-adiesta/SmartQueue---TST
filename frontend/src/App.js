// import React, { useEffect, useState } from 'react';
// // import Axio from "axio";
// import { Auth } from './components/auth';
// import {db, auth} from './firebaseConfig';
// import {
//     getDocs,
//     collection,
//     addDoc,
//     deleteDoc,
//     updateDoc,
//     doc,
//   } from "firebase/firestore";

// function App(){
//     const [user, setUser] = useState([]);
//     const  userCollectionref = collection(db, "user");

//     useEffect(() => {
//         const getUser = async()=>{
//             try{
//                 const data = await getDocs(userCollectionref);
//                 const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}));
//                 setUser(filteredData);
//             }catch(e){
//                 console.error(e);
//             }
//         };

//         getUser();
//     }, []);

//     return (
//         <div className="App">
//             <Auth/>
//             <div>
//                 {user.map((user))}
//             </div>
//             <h1>Smart Queue</h1>
//         </div>
//     );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext"; 
import ProtectedRoute from "./components/protectedroutes";
import Dashboard from "./components/dashboard";
// import Queue from "./components/Queue";
// import JoinQueue from "./components/JoinQueue";
import Login from "./components/login";
import Register from "./components/register";

function App() {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/queue"
              element={
                <ProtectedRoute>
                  {/* <Queue /> */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/join"
              element={
                <ProtectedRoute>
                  {/* <JoinQueue /> */}
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    );
  }
  
  export default App;