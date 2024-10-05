import { AiOutlineShoppingCart } from "react-icons/ai";

const Transaction = () => {
  return (
    <div className="bg-blue-200 flex items-center h-[100vh] justify-center">
      <div className="bg-white shadow-md rounded-md w-[70%] h-[70%] flex items-center justify-center">
        <div className="bg-gray-400 w-10/12 h-5/6 ">
          <div className="bg-green-400 flex flex-col justify-center p-2 space-y-2">
            <div className="flex justify-center space-x-4">
              <div className="bg-white shadow-sm rounded-md w-[25%] h-16 flex flex-col justify-center px-2">
                <AiOutlineShoppingCart />
                <p>Card</p>
              </div>
              <div className="bg-white shadow-sm rounded-md w-[25%] h-16 flex flex-col justify-center px-2">
                <AiOutlineShoppingCart />
                <p>EPS</p>
              </div>
              <div className="bg-white shadow-sm rounded-md w-[25%] h-16 flex flex-col justify-center px-2">
                <AiOutlineShoppingCart />
                <p>Giropay</p>
              </div>
              <div className="bg-white shadow-sm rounded-md w-[8%] h-16 px-2">
                ...
              </div>
            </div>
            <div className="bg-purple-500 p-2 flex flex-col items-center">
              <div className="bg-cyan-400 w-[93%]">
                <label>Card Number</label>
                <input type="number" className="w-full" />
              </div>
              <div className="bg-blue-400 w-[93%] flex justify-between">
                <div>
                  <label>Expiry</label>
                  <input type="number" className="w-full" />
                </div>
                <div>
                  <label>CVC</label>
                  <input type="number" className="w-full" />
                </div>
              </div>
              <div className="bg-orange-400 w-[93%] flex justify-between">
                <div>
                  <label>Country</label>
                  <input type="select" className="w-full " />
                </div>
                <div>
                  <label>Postal code</label>
                  <input type="number" className="w-full" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="bg-yellow-400">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
