import { useState, useEffect } from "react";
import { folderDomain, roomDomain } from "./common";
import { useParams } from "react-router-dom";
import Room from "./Room";
import Folder from "./Folder";
import { useContext} from 'react';
import { ToggleContext } from "../context/Reload";
import { NowContext } from '../context/Now';

function ItemBox() {

  const [folders, setFolder] = useState([]);  
  const [rooms, setRoom] = useState([]);  
  const [selects, setSelect] = useState([]);
  const { mem } = useParams();
  const {getSideBar} = useContext(ToggleContext);
  const {getNowFolder} = useContext(NowContext);

  // 폴더& 채팅방 목록 요청
  useEffect( ()=>  {  

    // 요청 URL 생성
    const requestURL = (domain) => {

        var URL = ''
        if(getNowFolder()===null) URL = `${domain}?id=${mem}`;
        else URL = `${domain}/inside?parent=${getNowFolder()}`;

        return URL
    }

    // 폴더 목록 요청
    var URL = requestURL(folderDomain)

    fetch(URL)  // Server에게 data 요청
      .then( res => {return res.json()}) 
      .then(json => {
 
        //item에 setting
        setFolder(json.inside); // 현재 폴더 내부 폴더들 setting
        setSelect(json.now); // 선택된 현재 폴더 setting      
      })
  
    // 채팅방 목록 요청
    URL = requestURL(roomDomain)
    
    fetch(URL)  // Server에게 data 요청
      .then( res => {return res.json()}) 
      .then(json => {
     
        //item에 setting
        setRoom(json);
          
  })}, [getSideBar, mem, getNowFolder]); 

  // 현재 폴더
  const NowFolder = () => {    

    const nowFolder = selects.map((select) => {
      return <Folder key={select.FolderID} keys={select.FolderID} name={select.Foldername} parent={select.ParentFolderID}/>
    })

      return <> 
      {nowFolder}
      </>
  }

  // 현재 폴더 & 내부 목록들
  const InsideFolder = () => {    

    const roomItemBox = rooms.map((room) => {
      return <Room key={room.RoomID} keys={room.RoomID} name={room.Roomname} folder={room.folderID}/>
    })
    const folderItemBox = folders.map((folder) => {
      return <Folder key={folder.FolderID} keys={folder.FolderID} name={folder.Foldername} parent={folder.ParentFolderID}/>
    })

      return <> 
      {roomItemBox}
      {folderItemBox}
      </>
  }

  return <div id="itemBox">
    <NowFolder />
    <InsideFolder/>
</div>;
}

export default ItemBox;
