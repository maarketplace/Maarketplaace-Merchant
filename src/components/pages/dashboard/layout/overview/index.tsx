import { IoWalletOutline, IoCardOutline, IoBagHandleOutline } from "react-icons/io5";
import { PiUsersFourThin } from "react-icons/pi";
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, ArcElement);

const getMonthsFromJanToNow = () => {
    const months = [];
    const currentMonth = new Date().getMonth();

    for (let i = 0; i <= currentMonth; i++) {
        const month = new Date(new Date().getFullYear(), i, 1);
        months.push(month.toLocaleString('default', { month: 'long' }));
    }

    return months;
};

const productData = (label: string) => ({
    labels: getMonthsFromJanToNow(),
    datasets: [
        {
            label: label,
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
            borderColor: '#FFC300',
            backgroundColor: '#FFC300',
        },
    ],
});
const customerData = (label: string) => ({
    labels: getMonthsFromJanToNow(),
    datasets: [
        {
            label: label,
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
            borderColor: '#FFC300',
            backgroundColor: '#FFC300',
        },
    ],
});
const pieData = {
    labels: ['Courses', 'Ebooks', 'Tickets'],
    datasets: [
        {
            label: 'Total Product',
            data: [30, 50, 20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
const barData = {
    labels: getMonthsFromJanToNow(),
    datasets: [
        {
            label: 'Total Withdraw',
            data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115].slice(0, getMonthsFromJanToNow().length),
            borderColor: '#FFC300',
            backgroundColor: '#FFC300',
            borderWidth: 1,
        },
    ],
};
const Overview = () => {
    return (
        <div className="w-[100%] flex items-center justify-center flex-col">
            <div className="w-[100%] p-[10px] flex justify-center gap-[10px] max-[650px]:flex-col" >
                <div className="w-[18%] h-[100px] border flex p-[10px] justify-center gap-[10px] rounded-[8px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 dark:border-none max-[650px]:w-[100%]">
                    <span className="w-[80%] h-[90%] p-[10px] flex flex-col gap-[10px] ">
                        <p className="text-[12px]" >Available Balance </p>
                        <p className="text-[18px]" >0.00</p>
                    </span>
                    <span className="w-[30px] h-[28px] flex justify-center items-center rounded-[100%] bg-black relative top-[10px] p-[5px] ">
                        <IoWalletOutline className="w-[25px] h-[25px] text-white dark:text-[#F3C200] " />
                    </span>
                </div>
                <div className="w-[18%] h-[100px] border flex p-[10px] justify-center gap-[10px] rounded-[8px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 dark:border-none max-[650px]:w-[100%]">
                    <span className="w-[80%] h-[90%] p-[10px] flex flex-col gap-[10px] ">
                        <p className="text-[12px]">Total Withdraw </p>
                        <p className="text-[18px]">0.00</p>
                    </span>
                    <span className="w-[30px] h-[28px] flex justify-center items-center rounded-[100%] bg-black relative top-[10px] p-[5px] ">
                        <IoCardOutline className="w-[25px] h-[25px] text-white dark:text-[#F3C200] " />
                    </span>
                </div>
                <div className="w-[18%] h-[100px] border flex p-[10px] justify-center gap-[10px] rounded-[8px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 dark:border-none max-[650px]:w-[100%]">
                    <span className="w-[80%] h-[90%] p-[10px] flex flex-col gap-[10px] ">
                        <p className="text-[12px]">Total Product </p>
                        <p className="text-[18px]">0.00</p>
                    </span>
                    <span className="w-[30px] h-[28px] flex justify-center items-center rounded-[100%] bg-black relative top-[10px] p-[5px] ">
                        <IoCardOutline className="w-[25px] h-[25px] text-white dark:text-[#F3C200] " />
                    </span>
                </div>
                <div className="w-[18%] h-[100px] border flex p-[10px] justify-center gap-[10px] rounded-[8px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 dark:border-none max-[650px]:w-[100%]">
                    <span className="w-[80%] h-[90%] p-[10px] flex flex-col gap-[10px] ">
                        <p className="text-[12px]">Total Order </p>
                        <p className="text-[18px]">0.00</p>
                    </span>
                    <span className="w-[30px] h-[28px] flex justify-center items-center rounded-[100%] bg-black relative top-[10px] p-[5px] ">
                        <IoBagHandleOutline className="w-[25px] h-[25px] text-white dark:text-[#F3C200] " />
                    </span>
                </div>
                <div className="w-[18%] h-[100px] border flex p-[10px] justify-center gap-[10px] rounded-[8px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 dark:border-none max-[650px]:w-[100%]">
                    <span className="w-[80%] h-[90%] p-[10px] flex flex-col gap-[10px] ">
                        <p className="text-[12px]">Total Customer </p>
                        <p className="text-[18px]">0.00</p>
                    </span>
                    <span className="w-[30px] h-[28px] flex justify-center items-center rounded-[100%] bg-black relative top-[10px] p-[5px] ">
                        <PiUsersFourThin className="w-[25px] h-[25px] text-white dark:text-[#F3C200] " />
                    </span>
                </div>
            </div>
            <div className="flex w-[95%] flex-wrap gap-[50px] mt-[50px] p-[5px]">
                <div className="h-[250px] w-[400px] max-[650px]:w-[100%]">
                    <Bar data={barData} />
                </div>
                <div className="h-[250px] w-[250px] flex justify-center items-center max-[650px]:w-[100%]">
                    <Pie data={pieData} height={180} width={500} />
                </div>
                <div className="h-[250px] w-[400px] max-[650px]:w-[100%]">
                    <Line data={productData('Total Product')} className="h-[100px] w-[100px]" />
                </div>
                <div className="h-[250px] w-[400px] max-[650px]:w-[100%]">
                    <Line data={customerData('Total Customer')} className="h-[100px] w-[100px]" />
                </div>

            </div>
        </div>
    )
}

export default Overview