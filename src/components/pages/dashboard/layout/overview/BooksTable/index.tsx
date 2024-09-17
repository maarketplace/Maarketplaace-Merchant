interface Course {
  title: string;
  status: string;
  pages: string;
  author: string;
}

interface BooksTableProps {
  courses: Course[];
}

const BooksTable = ({ courses }: BooksTableProps) => {
  const statusClass = (status: string) => {
    if (status === "Completed") {
      return "text-green-600";
    } else if (status === "In Progress") {
      return "text-yellow-500";
    } else if (status === "Not Started") {
      return "text-red-500";
    } else {
      return "text-gray-500";
    }
  };

  return (
    <div className="h-[65%] bg-white rounded-lg shadow-md p-2">
      <h1 className="font-bold text-lg pl-4">Your Books</h1>
      <div className="container mx-auto px-2 h-[90%] overflow-auto scrollbar-hide">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left">
              <th className="p-4 border-b border-gray-500">Course Title</th>
              <th className="p-4 border-b border-gray-500">Status</th>
              <th className="p-4 border-b border-gray-500">Pages</th>
              <th className="p-4 border-b border-gray-500">Author</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="p-4 border-b border-gray-500">{course.title}</td>
                <td className={`p-4 border-b border-gray-500 ${statusClass(course.status)}`}>
                  {course.status}
                </td>
                <td className="p-4 border-b border-gray-500">{course.pages}</td>
                <td className="p-4 border-b border-gray-500">{course.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksTable;
