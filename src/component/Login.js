import {kakaoDomain} from "./common";
import { naverDomain } from "./common";

function Login(props) {

var alt_N = `${props.name} 로그인`;
var domainDic = {
  "kakao":kakaoDomain,
  "naver":naverDomain
}
var requestURL = domainDic[props.name]/*카카오면 카카오 domain, naver면 naver domain*/

  return (
    <a href={requestURL} className="login-button">
      <img src={props.img} alt={alt_N} />
    </a>
  );
}

export default Login;
