interface UpcomingBook {
  image: string;
  title: string;
  author: string;
  date: string;
}

const UpcomingBooks = () => {
  const upcomingBooks: UpcomingBook[] = [
    {
      image: "Loginimage.png",
      title: "Introduction To Crypto",
      author: "Abu David",
      date: "17/02/2024",
    },
    {
      image: "Loginimage.png",
      title: "Introduction To Crypto",
      author: "Abu David",
      date: "17/02/2024",
    },
    {
      image: "Loginimage.png",
      title: "Introduction To Crypto",
      author: "Abu David",
      date: "17/02/2024",
    },
    {
      image: "Loginimage.png",
      title: "Introduction To Crypto",
      author: "Abu David",
      date: "17/02/2024",
    },
    {
      image: "Loginimage.png",
      title: "Introduction To Crypto",
      author: "Abu David",
      date: "17/02/2024",
    },
  ];

  return (
    <div className="h-[100%] w-[95%] rounded-lg shadow-lg flex flex-col items-center p-2 space-y-2">
      <h1 className="font-bold text-lg w-full">Upcoming Book</h1>
      <div className="bg-white w-full h-fit flex-1 overflow-auto scrollbar-hide space-y-2">
        {upcomingBooks.map((book, index) => (
          <UpcomingBookItem key={index} {...book} />
        ))}
      </div>
      <div>
        <button className="bg-yellow-400 rounded-xl font-semibold px-9 text-sm p-3">
          See All Upcoming Courses
        </button>
      </div>
    </div>
  );
};

const UpcomingBookItem = ({
  image,
  title,
  author,
  date,
}: UpcomingBook) => (
  <div className="h-16 rounded-lg flex gap-1 border border-gray-400 items-center p-1">
    <div className="w-16 h-12 bg-cyan-600 rounded-lg">
      <img src={`./${image}`} alt={title} className="object-cover w-full h-full" />
    </div>
    <div className="w-44 flex flex-col justify-center">
      <h4 className="font-semibold text-sm">{title}</h4>
      <div className="flex justify-between text-sm">
        <p className="text-gray-400">By {author}</p>
        <span className="text-red-400">{date}</span>
      </div>
    </div>
  </div>
);

export default UpcomingBooks;
