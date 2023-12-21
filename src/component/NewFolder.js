import { useParams } from "react-router-dom";
import { folderDomain } from "./common";
import { useContext} from 'react';
import { NowContext } from '../context/Now';
import { ToggleContext } from "../context/Reload";
import { FaFolderPlus } from "react-icons/fa6";
function NewFolder() {

  const { mem } = useParams();
  const {getNowFolder} = useContext(NowContext);
  const {sideBarToggle } = useContext(ToggleContext);
  
  // 새로운 폴더 생성  
  const newFolder = (event) => { 

    event.preventDefault();  //  이 이벤트의 기본 핸들러 동작 못하게 함. 
  
    var bodyString = JSON.stringify({  // javascript 객체를 json 문자열로 바꿈  
            userID : mem,
            parentFolderID: getNowFolder()
    });

    // post method
    fetch(`${folderDomain}`, 
            {   method: "PUT",  // POST 요청 
            headers: {"Content-Type": "application/json"},
            body: bodyString }  
    )
    .then((response) => response.json())
    .then((result) => { 
                        console.log(result); // 응답 console에 log로 찍는다
                        sideBarToggle(); // SideBar 업뎃
                      });
  }

  return (
    <div>
      <div className="favorite-button" onClick={newFolder}>
        <FaFolderPlus className="folder-cursor" size="55"/>   
      </div>
    </div>
  );
}

export default NewFolder;
