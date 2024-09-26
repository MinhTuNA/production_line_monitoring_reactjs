import React,{useEffect} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRoutes from "./routes/appRoutes";
import { getUser } from "./services/API_service";
import { useDispatch } from "react-redux";
import { setAuth,setEmail,setName,setPhoneNumber,setRole,setId } from "./components/redux/reducers/authReducer";
// import Counter from './counter';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAccount = async() => {
      try {
        const res = await getUser();
      if(res){
        dispatch(setAuth());
        dispatch(setId(res.data.id));
        dispatch(setEmail(res.data.email));
        dispatch(setName(res.data.name));
        dispatch(setPhoneNumber(res.data.phoneNumber));
        dispatch(setRole(res.data.role));
      }
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchAccount();
  },[])

  return (
    <div className="App">
      <ToastContainer autoClose={1000} />
      <AppRoutes/>
    </div>
  );
}

export default App;
