import Layout from "./layout";
import SideBar from "./sidebar";

const DashboardMain = () => {
  return (
    <div className="w-[100%] flex bg-[white] dark:bg-black">
      <div className="w-[15%] bg-[white] dark:bg-black max-[650px]:hidden">
        <div className="w-[100%] h-[15%] flex items-center justify-center rounded-r-[50px] p-2">
          <img src="/logomarke.png" alt="image" className="" />
        </div>
        <div className="w-[100%] h-[85%] bg-[#FFC300] rounded-tr-[50px] p-[10px] sticky inset-0">
          <SideBar />
        </div>
      </div>
      <div className="w-[85%] h-[100vh] flex justify-center max-[650px]:ml-[0px] scrollbar-hide max-[650px]:w-[100%]">
        <div className="w-[100%] dark:bg-black h-[100%] overflow-scroll scrollbar-hide">
          <Layout />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
