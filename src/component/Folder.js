import { folderDomain} from "./common";
import { useContext, useRef, useState} from 'react';
import { NowContext } from '../context/Now';
import { ToggleContext } from "../context/Reload";
import { FaFolder, FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { FaFolderOpen } from "react-icons/fa6";

function Folder(props) {
        
  const {getNowFolder, getNowClick, getNowRightClick, updateNowFolder, updateNowClick, updateNowRightClick } = useContext(NowContext);
  const { sideBarToggle } = useContext(ToggleContext);
  const [isEditing, setIsEditing] = useState(false);
  const messageRef = useRef();

  // 클릭 시 update
  const update = () => {
   
    if(getNowFolder() !== props.keys) openFolder()
    else closeFolder()
  }

  // 폴더 열기
  const openFolder = () => {
    updateNowFolder(props.keys)
    updateNowClick("Folder")
    updateNowRightClick(null)
  }

  // 폴더 닫기
  const closeFolder = () => {
    updateNowFolder(props.parent) // 현재 폴더를 부모 폴더로
    updateNowClick(null)
    updateNowRightClick(null)
  }

  // Display 모드 전환
  const changeDisplay = (event) => {
 
    event.preventDefault();  //  이 이벤트의 기본 핸들러 동작 못하게 함. 

    updateNowClick("Folder")

    if(getNowRightClick() !== props.keys) updateNowRightClick(props.keys)
    else updateNowRightClick(null)
  } 
  
  // 수정 모드로 전환
  const editFolder = (event) => {
  
    event.preventDefault();  //  이 이벤트의 기본 핸들러 동작 못하게 함. 
    setIsEditing(true);// 수정모드로 전환
  }

  // 폴더 이름 변경
  const saveFolder = (event) => { 

    event.preventDefault();  //  이 이벤트의 기본 핸들러 동작 못하게 함. 
    var value = messageRef.current.value===null ? "New Folder":messageRef.current.value; // 입력값 가져오기

    // post method
    fetch(`${folderDomain}?id=${props.keys}&name=${value}`, 
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

  // 폴더 삭제하기
  const removeFolder = (event) => { 
    event.preventDefault();  //  이 이벤트의 기본 핸들러 동작 못하게 함. 

    // post method
    fetch(`${folderDomain}?id=${props.keys}`, 
            {  method: "DELETE",  // POST 요청 
            headers: {"Content-Type": "application/json"}}  
    )
    .then((response) => response.json())
    .then((result) => { 
                        console.log(result); // 응답 console에 log로 찍는다
                        updateNowFolder(null) // 현재 폴더키 null로 설정
                        sideBarToggle() // 사이드 바 재로딩
                      });
    }

// 수정, 저장 ICON
const SaveIcon = () => <VscSaveAs className="edit-icons" onClick={saveFolder} size="20" /> // 저장 아이콘
const EditIcon = () => <MdEdit className="edit-icons" onClick={editFolder} size="20" /> // 수정 아이콘

// 수정, 삭제 BOX
const EditBox = () => <div className="edit-box"> 
  <div>{isEditing ? <SaveIcon /> : <EditIcon />}</div>
  <div><FaTrashAlt className="edit-icons" onClick={removeFolder} size="20" /></div>
</div>

  // Editing mode일때 나타날 내용
  const EditingMode = () => <>
    <div className="folder-box">
      {getNowFolder()===props.keys ? (<CloseMode />) : (<OpenMode/>)}
      <div className='room-input'><input type="text" ref={messageRef} defaultValue={props.name}/></div>
    </div>
    <EditBox />
  </>

  // Viewing mode일 때 나타날 내용
  const GeneralMode = () => <>
    <div className="folder-box" onContextMenu={changeDisplay} onClick={update}>
      {getNowFolder()===props.keys ? (<CloseMode />) : (<OpenMode />)}
      <div className="name-box">{props.name}</div>
    </div>

    {(getNowClick() === "Folder") && (getNowRightClick() === props.keys) ? (<EditBox />):null}
  </>

  // Folder가 open 상태일때 나타날 내용
  const CloseMode = () => <>
    <div><FaFolderOpen className="folder-icon" size="25" /></div>
  </>

  // Folder가 close 상태일때 나타날 내용
  const OpenMode = () => <>
    <div><FaFolder className="folder-icon" size="25" /></div>
  </>


    return (
      <div className="folder-container" style={(getNowFolder() === props.parent) && (getNowFolder()!==null) ? { marginLeft: '10px' } : {}}>
        {isEditing ? <EditingMode /> : <GeneralMode />}
      </div>
    );
  }
  
  export default Folder;
  