import KakaoLogin from 'react-kakao-login';
import { useNavigate } from 'react-router-dom';
import { loginDomain } from './common';

const KakaoLoginButton = () => {
  const navigate = useNavigate();

  const usingChat = (id) => {
    navigate(`/chat/${id}`);
  };

  const responseKaKao = (response) => {
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

  return (
    <KakaoLogin
      token="" // 카카오 개발자 포털에서 발급받은 JavaScript Key
      onSuccess={responseKaKao}
      onFail={(err) => console.error(err)}
      onLogout={() => console.info('logout')}
    />
  );
};

export default KakaoLoginButton;
