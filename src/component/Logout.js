import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";

function Logout() {
  const navigate = useNavigate();

  // 쿠키 삭제 함수
function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

  const logout = () => {

    // 함수 호출로 모든 쿠키 삭제
    deleteAllCookies();

    goHomePage()
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
