import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";

function Login(props) {

  return (
    props.name==="kakao" ? <KakaoLoginButton />:<NaverLoginButton />
  );
}

export default Login;
