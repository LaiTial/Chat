import React from 'react';
import { loginDomain } from './common';
import { useNavigate } from 'react-router-dom';
import NaverLogin from 'react-naver-login';

const NaverLoginButton = ({ onLoginSuccess, onLoginFailure }) => {

  const navigate = useNavigate();
  const naverClientId = '';

  const usingChat = (id) => {
    navigate(`/chat/${id}`);
  };

  const responseNaver = (response) => {
    const email = response.profile.kakao_account.email;
    const nickname = response.profile.properties.nickname;

    fetch(`${loginDomain}?email=${email}&nickname=${nickname}&provider=kakao`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((json) => {
        usingChat(json.id);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  };

  const handleNaverLogin = (response) => {
    if (response) {
      // 로그인 성공 시 처리
      responseNaver(response);
    } else {
      // 로그인 실패 시 처리
      onLoginFailure();
    }
  };

  return (
    <NaverLogin
      clientId={naverClientId}
      callbackUrl=""
      onSuccess={handleNaverLogin}
      onFailure={handleNaverLogin}
      isPopup={true}
      callbackHandle={true}
      render={(props) => (
        <button onClick={props.onClick}>네이버 로그인</button>
      )}
    />
  );
};

export default NaverLoginButton;
