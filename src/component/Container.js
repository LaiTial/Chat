import SendBox from "./SendBox";
import ChatBox from "./ChatBox";
import Logo from "../component/Logo";
function Container() {

  return (
    <div className="chat-container">
      <Logo />
      <ChatBox/>
      <SendBox/>
    </div>
  );
}

export default Container;
