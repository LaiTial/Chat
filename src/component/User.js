import Logo from "../img/Logo.jpg";
import { useState, useEffect } from "react";
import { userDomain } from "./common";
import { useParams } from "react-router-dom";

function User() {

  const [name, setName] = useState(""); 
  const { mem } = useParams(); 
 
  useEffect( ()=>  {  
    //server로 비동기 요청  

    var requestURL = `${userDomain}?id=${mem}`;

    fetch(requestURL)  // Server에게 data 요청
      .then( res => {return res.json()}) 
      .then(json => {

        //User 이름 setting
        setName(json[0]['name']);
      
      })}, [mem]); 

  return (
    <div className="sidebar-user-logo">
      <div><img src={Logo} alt="User Logo" id="user-img" /></div>
      <div>{name}</div>
    </div>
  );
}

export default User;
