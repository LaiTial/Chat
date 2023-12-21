import Chat_Logo from "../img/chatbot-message.png";
import User_Logo from "../img/user-message.png";

function Chat({sender, message}) {

  var imgDic = {'user-message':User_Logo, 'chatbot-message':Chat_Logo}
  var classN = `message-box ${sender}`;

  return (
    <div className={classN}>
      <img src={imgDic[sender]} id="chatImage" alt="LOGO"/>
      <div className="content">{message}</div>
    </div>
    );
}

export default Chat;
