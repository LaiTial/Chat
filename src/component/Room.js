import { useContext, useState, useRef} from 'react';
import { NowContext } from '../context/Now';
import { ToggleContext } from "../context/Reload";
import { PiChatsFill } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { roomDomain } from './common';
import { VscSaveAs } from "react-icons/vsc";

function Room(props) {
    
  const {getNowRoom, getNowClick, getNowFolder, updateNowRoom, updateNowClick, updateNowRightClick } = useContext(NowContext);
  const {sideBarToggle } = useContext(ToggleContext);
  const [isEditing, setIsEditing] = useState(false);
  const messageRef = useRef();

  // 현재 채팅방 클릭시 업데이트
  const update = () => { 

    updateNowRoom(props.keys)
    updateNowClick("Room")
    updateNowRightClick(null)
  }

  // 수정 모드로 전환
  const editRoom = (event) => {

    event.preventDefault();  //  이 이벤트의 기본 핸들러 동작 못하게 함. 
    setIsEditing(true);// 수정모드로 전환
  }

  // 채팅방 이름 변경
  const saveRoom = (event) => { 

    event.preventDefault();  //  이 이벤트의 기본 핸들러 동작 못하게 함. 
    var value = messageRef.current.value===null ? "New Chat":messageRef.current.value; // 입력값 가져오기

    // post method
    fetch(`${roomDomain}?room=${props.keys}&name=${value}`, 
            {   method: "POST",  // POST 요청 
            headers: {"Content-Type": "application/json"}}  
    )
    .then((response) => response.json())
    .then((result) => { 
                        console.log(result); // 응답 console에 log로 찍는다
                        setIsEditing(false); // 일반 모드로 전환
                        sideBarToggle() // 사이드 바 재로딩
                      });
}


  // 채팅방 삭제하기
  const removeRoom = (event) => { 
    event.preventDefault();  //  이 이벤트의 기본 핸들러 동작 못하게 함. 

    var requestURL = `${roomDomain}?id=${props.keys}`;

    // post method
    fetch(requestURL, 
            {   method: "DELETE",  // POST 요청 
            headers: {"Content-Type": "application/json"}}  
    )
    .then((response) => response.json())
    .then((result) => { 
                        console.log(result); // 응답 console에 log로 찍는다
                        updateNowRoom(null) // 현재 채팅방키 null로 설정
                        sideBarToggle(); // SideBar 업뎃
                      });
    }

 // 채팅방 style

// 폴더 안에 있는 채팅방일 시 
 const folderStyle = (getNowFolder() === props.folder && getNowFolder() !== null) 
 ? { marginLeft: '10px' }
 : {};

// 현재 채팅방 선택 시
const roomStyle = (getNowRoom() === props.keys && getNowClick()==="Room")
 ? { backgroundColor: '#2ABCB4' }
 : {backgroundColor: '#52e4dc'};

// 두개의 style를 병합
const combinedStyle = { ...folderStyle, ...roomStyle };

  // 채팅방 클릭 시 나타날 내용
  const NowChat = () => 
    <div className='edit-box'>
        <div><MdEdit className="edit-icons" onClick={editRoom} size="20" /></div>
        <div><FaTrashAlt className="edit-icons" onClick={removeRoom} size="20" /></div>
      </div>

    // Editing mode일때 나타날 내용
    const EditingMode = () => <>
      <div className='room-box'>
        <div><PiChatsFill className="room-icon" size="30"/></div>
        <div className='room-input'><input type="text" className='room-input' ref={messageRef} defaultValue={props.name}/></div>
      </div>
      <div className='edit-box'>
        <div><VscSaveAs className="edit-icons" onClick={saveRoom} size="20" /></div>
        <div><FaTrashAlt className="edit-icons" onClick={removeRoom} size="20" /></div>
      </div>
  </>

  // Viewing mode일 때 나타날 내용
  const GeneralMode = () => <>
      <div className='room-box' onClick={update}>
        <div><PiChatsFill className="room-icon" size="30"/></div>
        <div className="name-box">{props.name}</div> 
      </div>
        {getNowRoom()===props.keys && getNowClick()==="Room" ? (<NowChat />) : null}
    </>

  return (
    <div className="room-container" style={combinedStyle}>
        {isEditing ? (<EditingMode />) : (<GeneralMode />)}
    </div>
  );
}

export default Room;
