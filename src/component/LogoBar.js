import User from "./User";
import Logout from "./Logout";

function LogoBar() {
  return (
    <div className="logo-logout-container">
        <User />
        <Logout />
    </div>
  );
}

export default LogoBar;
