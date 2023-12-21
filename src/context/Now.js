import React, { useState } from 'react';

// 전역 변수
let initialValues = {
  nowRoom: null,
  nowFolder: null,
  nowClick : null,
  nowRightClick:null
};

// 전역 변수를 감싸고 있는 컨텍스트
const NowContext = React.createContext();

const NowProvider = ({ children }) => {
  const [nowState, setNowState] = useState(initialValues);

  // 현재 Room 번호 가져오기
  const getNowRoom = () => {
    return nowState.nowRoom;
  };

  // 현재 Folder 번호 가져오기
  const getNowFolder = () => {
    return nowState.nowFolder;
  };

  // 현재 Click 가져오기
  const getNowClick = () => {
    return nowState.nowClick;
  };

  // 현재 우 Click 가져오기
  const getNowRightClick = () => {
    return nowState.nowRightClick;
  };

  // nowRoom을 업데이트
    const updateNowRoom = (newRoom) => {
      setNowState((prevNowState) => ({
        ...prevNowState,
        nowRoom: newRoom,
      }));
    };

  // nowFolder을 업데이트
    const updateNowFolder = (newFolder) => {
      setNowState((prevNowState) => ({
        ...prevNowState,
        nowFolder: newFolder,
      }));
    };

  // 현재 Click 업데이트
  const updateNowClick = (newClick) => {
    setNowState((prevNowState) => ({
      ...prevNowState,
      nowClick: newClick,
    }));
  };

  // 현재 우 Click 업데이트
  const updateNowRightClick = (newClick) => {
    setNowState((prevNowState) => ({
      ...prevNowState,
      nowRightClick: newClick,
    }));
  };

  return (
    <NowContext.Provider value={{getNowRoom, getNowFolder, getNowClick, getNowRightClick, updateNowRoom, updateNowFolder, updateNowClick, updateNowRightClick}}>
      {children}
    </NowContext.Provider>
  );
};

export { NowProvider, NowContext };