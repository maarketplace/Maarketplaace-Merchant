import CarouselItem from "../CarouselItem";

const Carousel = () => {
  const items = [
    {
      image: "Loginimage.png",
      title: "Forex Crash Course",
      subTitle: "Introduction to Forex",
      description: "This course covers the essential concepts of Forex trading.",
      logo: "Logo",
      rating: 5,
      author: "Author 1",
      duration: 60,
      pages: "200",
    },
    {
      image: "Loginimage.png",
      title: "Forex Crash Course",
      subTitle: "Introduction to Forex",
      description: "This course covers the essential concepts of Forex trading.",
      logo: "Logo",
      rating: 3.5,
      author: "Author 1",
      duration: 60,
      pages: "200",
    },
    {
      image: "Loginimage.png",
      title: "Forex Crash Course",
      subTitle: "Introduction to Forex",
      description: "This course covers the essential concepts of Forex trading.",
      logo: "Logo",
      rating: 2.0,
      author: "Author 1",
      duration: 60,
      pages: "200",
    },
    {
      image: "Loginimage.png",
      title: "Forex Crash Course",
      subTitle: "Introduction to Forex",
      description: "This course covers the essential concepts of Forex trading.",
      logo: "Logo",
      rating: 4.5,
      author: "Author 1",
      duration: 60,
      pages: "200",
    },
    {
      image: "Loginimage.png",
      title: "Forex Crash Course",
      subTitle: "Introduction to Forex",
      description: "This course covers the essential concepts of Forex trading.",
      logo: "Logo",
      rating: 1,
      author: "Author 1",
      duration: 60,
      pages: "200",
    },
  ];

  return (
    <div className="flex h-full justify-between items-center space-x-4">
      {items.map((item, index) => (
        <CarouselItem key={index} {...item} index={index}/>
      ))}
    </div>
  );
};

export default Carousel;
