import OverviewSection from "./OverviewSection";
import BooksTable from "./BooksTable";
import UpcomingBooks from "./UpcomingBooks";
import Carousel from "./Carousel";

const Dashboard = () => {
  const courses = [
    {
      title: "JavaScript Basics",
      status: "Completed",
      pages: "150",
      author: "Barry Allen",
    },
    {
      title: "C++",
      status: "In Progress",
      pages: "200",
      author: "Cisco Rahman",
    },
    {
      title: "Ython",
      status: "Not Started",
      pages: "200",
      author: "Haarison Wells",
    },
    {
      title: "Node",
      status: "Completed",
      pages: "200",
      author: "Caitlin Snow",
    },
    {
      title: "Linx",
      status: "In Progress",
      pages: "200",
      author: "Iris West",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 space-y-4">
      <div className="col-span-2 flex gap-4 h-[60vh]">
        <div className="w-full space-y-2">
          <OverviewSection />
          <BooksTable courses={courses} />
        </div>
        <div className="bg-white rounded-md">
          <UpcomingBooks />
        </div>
      </div>
      <div className="w-[163vh] col-span-1 shadow-lg rounded-lg flex flex-col gap-4 h-[60vh] justify-center overflow-x-auto scrollbar-hide">
        <Carousel />
      </div>
    </div>
  );
};

export default Dashboard;
