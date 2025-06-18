import { Outlet } from "react-router-dom"
import MerchantHeader from "./header"

const Merchant = () => {
  return (
    <div>
        <div>
           <MerchantHeader/>
        </div>
        <div>
          <Outlet/>
        </div>
    </div>
  )
}

export default Merchant

