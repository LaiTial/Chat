import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { logoutDomain } from "./common";

function Logout() {
  const navigate = useNavigate();

  const logout = () => {

    // 함수 호출로 모든 쿠키 삭제
    fetch(logoutDomain)
      .then(res=>res.json())
      .then(json=>{
        console.log(json)
        goHomePage()
      })
  }
  const goHomePage = () => {
    navigate(`/`);
  };
  return (
    <div className="sidebar-logout" onClick={logout}>
      <IoLogOut size="50" className="logout" />
    </div>
  );
}

export default Logout;
