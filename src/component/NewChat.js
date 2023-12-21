import { useParams } from "react-router-dom";
import { roomDomain } from "./common";
import { useContext} from 'react';
import { NowContext } from '../context/Now';
import { ToggleContext } from "../context/Reload";

function NewChat() {

  const { mem } = useParams();
  const {getNowFolder, updateNowRoom, updateNowClick } = useContext(NowContext);
  const {sideBarToggle } = useContext(ToggleContext);

  const newRoom = (event) => { 
    event.preventDefault();  //  이 이벤트의 기본 핸들러 동작 못하게 함. 
  
    var bodyString = JSON.stringify({  // javascript 객체를 json 문자열로 바꿈  
            userID : mem,
            folderID: getNowFolder()
    });

    // post method
    fetch(`${roomDomain}`, 
            {   method: "PUT",  // POST 요청 
            headers: {"Content-Type": "application/json"},
            body: bodyString }  
    )
    .then((response) => response.json())
    .then((result) => { 
                        console.log(result); // 응답 console에 log로 찍는다
                        updateNowRoom(result.id) // 현재 채팅창 변경
                        updateNowClick(null);
                        sideBarToggle(); // SideBar 업뎃
                      });
  }



  return (
    <div>
      <button className="new-chat-button" onClick={newRoom}>+ New Chat</button>
    </div>
  );
}

export default NewChat;
