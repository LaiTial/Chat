import LogoImage from '../img/Logo.png';
import { useContext } from 'react';
import { NowContext } from '../context/Now';
function Logo() {

  const { getNowRoom } = useContext(NowContext);
  const Init = () => <div className='logo-box'>
      <div className="start-message">
        <img src={LogoImage} alt="Chat"/>
        <h1>Pet Assistant ChatBot</h1>
      </div>
  </div>

  return ( 
  <>
  {getNowRoom()===null ? (<Init />) : (null)}
  </>
    );
}

export default Logo;
