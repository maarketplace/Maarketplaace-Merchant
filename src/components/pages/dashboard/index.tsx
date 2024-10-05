import Layout from "./layout";
import SideBar from "./sidebar";

const DashboardMain = () => {
    return (
        <div className="w-[100%] flex bg-[white] dark:bg-black">
            <div className="w-[18%] bg-[white] dark:bg-black max-[650px]:hidden">
                <div className="w-[100%] h-[15%] rounded-r-[50px] p-2">
                    <img src="LOGO.svg" alt="image" className="w-[180px] h-[100px]" />
                </div>
                <div className="w-[100%] h-[85%] bg-[#FFC300] rounded-tr-[50px] p-[10px]">
                    <SideBar />
                </div>
            </div>
            <div className="w-[100%]  flex justify-center max-[650px]:ml-[0px] scrollbar-hide">
                <div className="w-[95%] dark:bg-black h-[80%]">
                    <Layout />
                </div>
            </div>
        </div>
    );
};

export default DashboardMain;
