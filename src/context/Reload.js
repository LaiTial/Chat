// reload.js
import React, { createContext, useState} from 'react';


// 초기 값 설정
let initialValues = {
  sideBar: null, // 사이드 바 업뎃 여부
  chatBox: false, // 채팅창 업뎃 여부
};

const ToggleContext = createContext();

const ToggleProvider = ({ children }) => {
  const [isToggleOn, setToggleOn] = useState(initialValues);

  // 현재 SideBar 번호 가져오기
  const getSideBar = () => {
    return isToggleOn.sideBar;
  };

  // 현재 ChatBox 번호 가져오기
  const getChatBox = () => {
    return isToggleOn.chatBox;
  };

 // SideBar 재실행
 const sideBarToggle = () => {
    setToggleOn((prevToggleOn) => ({
      ...prevToggleOn,
      sideBar: !prevToggleOn.sideBar,
    }));
  };

 // ChatBox 재실행
 const ChatBoxToggle = () => {
    setToggleOn((prevToggleOn) => ({
      ...prevToggleOn,
      chatBox: !prevToggleOn.chatBox,
    }));
  };

  return (
    <ToggleContext.Provider value={{ getSideBar, getChatBox, sideBarToggle, ChatBoxToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

export { ToggleProvider, ToggleContext };