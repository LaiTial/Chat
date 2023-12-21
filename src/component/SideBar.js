import Bar from "./Bar";
import LogoBar from "./LogoBar";
import ItemBox from "./ItemBox";

// 사이드 바
function SideBar() {

  return (
    <div className="sidebar">
      <Bar/>
      <ItemBox/>
      <LogoBar />
    </div>
  );
}

export default SideBar;
