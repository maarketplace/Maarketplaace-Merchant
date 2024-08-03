import { SetStateAction } from "react"
import Layout from "./layout"
import SideBar from "./sidebar"

const DashboardMain = () => {
    return (
        <div className="w-[100%] flex" >
            <div className="w-[18%] bg-[white]  dark:bg-black max-[650px]:hidden">
                <div className="w-[100%] h-[15%] rounded-r-[50px] p-2 ">
                    <img src="LOGO.svg" alt="image" className="w-[180px] h-[100px] " />
                </div>
                <div className="w-[100%] h-[85%] bg-[#FFC300] rounded-tr-[50px] p-[10px] ">
                    <SideBar showSideBar={false} setShowSidebar={function (_value: SetStateAction<boolean>): void {
                    } }  />
                </div>
            </div>
            <div className="w-[100%] flex justify-center">
                <div className="w-[100%] dark:bg-black h-[100%]">
                    <Layout />
                </div>
            </div>
        </div>
    )
}

export default DashboardMain