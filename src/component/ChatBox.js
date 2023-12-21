import Chat from "./Chat";
import { useState, useEffect } from "react";
import { NowContext } from '../context/Now';
import { ToggleContext } from "../context/Reload";
import { chatDomain } from "./common";
import { useContext } from "react";

function ChatBox() {

  const [chat, setChat] = useState([]);  
  const { getNowRoom } = useContext(NowContext);
  const {getChatBox} = useContext(ToggleContext);
  var Dic = {'0':'chatbot-message', '1':'user-message'}

  // 채팅 내역 요청
  useEffect( ()=>  {  
    //server로 비동기 요청  
    
      var requestURL = `${chatDomain}?room=${getNowRoom()}`;
      
      fetch(requestURL)  // Server에게 data 요청
        .then( res => {return res.json()}) 
        .then(json => {
     
          //item에 setting
          setChat(json);
          
    })}, [getNowRoom, getChatBox]); 

  return (<div className="chat-box" id="chat-box">
    {
    chat.map((c_) => {
      return <Chat key={c_.id} sender={Dic[c_.roles]} message={c_.texts}/>
    })
  }
  </div>);
}

export default ChatBox;
