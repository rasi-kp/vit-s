import  { useState } from "react";
import Adminpanelcomponent from "../components/Adminpanelcomponent";
import PasswordForm from "../components/PasswordForm";

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem("accessToken")  // shezi
  );
  // console.log("accessToken", sessionStorage.getItem("accessToken"))

//   const handlePasswordSubmit = (enteredPassword) => {
//     if(enteredPassword === 'savvy') {
//         setAuthenticated(true);
//         localStorage.setItem('authenticated', 'true')
//     }else{
//         alert('Incorrect Password, pease try again');
//     }
// };

  return (
    <div className="adminpanel-container">
      {authenticated ? (
        <Adminpanelcomponent />
      ) : (
        <PasswordForm  />   // shezi
      )}
    </div>
  );
}