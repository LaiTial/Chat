import Container from "../component/Container";
import SideBar from "../component/SideBar";
import { ToggleProvider } from "../context/Reload";
import "../App.css";

function ChatBox() {

  return (
    <div className="container">
      <ToggleProvider>
        <SideBar />
        <Container />
      </ToggleProvider>
    </div>
  );
}

export default ChatBox;
