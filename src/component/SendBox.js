import Send from "../img/sent.jpg";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { chatDomain } from "./common";
import { useContext } from "react";
import { NowContext } from '../context/Now';
import { ToggleContext } from "../context/Reload";
import { FaHourglassEnd } from "react-icons/fa";

function SendBox() {

  const messageRef = useRef();
  const { mem } = useParams();
  const {getNowRoom, updateNowRoom } = useContext(NowContext);
  const {sideBarToggle, ChatBoxToggle} = useContext(ToggleContext);
  const [sleep, setSleep] = useState(false);

  // 새 채팅 전송
  const sendQ = () => {
    setSleep(true);
    var message = messageRef.current.value
    messageRef.current.value = ''
      
    var bodyString = JSON.stringify({  // javascript 객체를 json 문자열로 바꿈  
            users : mem,
            chatRoom: getNowRoom(),
            texts: message
    });

    // post method
    fetch(`${chatDomain}`, 
            {   method: "PUT",  // POST 요청 
            headers: {"Content-Type": "application/json"},
            body: bodyString }  
    )
    .then((response) => response.json())
    .then((result) => { 
                        console.log(result); // 응답 console에 log로 찍는다
                        updateNowRoom(result.id) // 현재 채팅창 번호 업뎃
                        sideBarToggle() // 사이드 바 재실행
                        ChatBoxToggle(); // 채팅창 재실행
                        setSleep(false);
                      });
  }

  return (
    <div className="input-container">
      <input type="text" id="message-input" placeholder="메시지를 입력하세요" ref={messageRef}/>
      {sleep ? (<FaHourglassEnd size="50"/>):<img src={Send} alt="전송" id="send-image" onClick={sendQ}/>}
    </div>
  );
}

export default SendBox;
