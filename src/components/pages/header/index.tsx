import { useNavigate } from 'react-router-dom';
import { FiHome, FiUser } from "react-icons/fi";
import { RxDashboard, RxLightningBolt } from "react-icons/rx";
const MerchantHeader = () => {

    const navigate = useNavigate()
    // const location = useLocation();
    return (
        <div className="w-[100%] h-[9vh] relative  flex items-center justify-center max-[650px]:bottom-0 bg-[#FFC300] ">
            <div className="w-[85%] h-[100%] flex justify-around items-center max-[650px]:w-[90%]">
                <span>
                    <FiHome
                        className='w-[30px] h-[25px] cursor-pointer max-[650px]:h-[20px]'
                    /> 
                </span>
                <span>
                    <RxLightningBolt
                        className='w-[30px] h-[25px] cursor-pointer max-[650px]:h-[20px]'
                    />
                </span>
                <span>
                    <FiUser
                        className='w-[30px] h-[25px] cursor-pointer max-[650px]:h-[20px]'
                    />
                </span>
                <span onClick={()=> navigate('/dashboard')}>
                    <RxDashboard
                        className='w-[30px] h-[25px] cursor-pointer max-[650px]:h-[20px]'
                    />
                </span>
            </div>
        </div >
    )
}

export default MerchantHeader