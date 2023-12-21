import Login from "../component/Login";
import "../css/Login.css";
import kakao from "../img/kakao.png";
import naver from "../img/naver.png";

function Basic() {

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Pet Assistant ChatBot</h1>
        <div className="button-container">
          <Login img={kakao} name="kakao" />
          <Login img={naver} name="naver" />
        </div>
      </div>
    </div>
  );
}

export default Basic;
