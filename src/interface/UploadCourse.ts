export interface IAddCourse {
  courseName: string;
  coursePrice: number;
  courseDiscountedPrice: number;
  courseDescription: string;
  courseCategory: string;
  courseSubCategory: string;
  courseLocation: string;
  courseURL: string;
  courseImage: FileList | null;
  author: string;
  duration: string;
  topics: string;
  whatToExpect: string;
}

export interface IUpdateCourse {
  courseName: string;
  coursePrice: number;
  courseDiscountedPrice: number;
  courseDescription: string;
  courseCategory: string;
  courseSubCategory: string;
  courseLocation: string;
  courseURL: string;
  courseImage: FileList | null;
  author: string;
  duration: string;
  topics: string;
  whatToExpect: string;
}
