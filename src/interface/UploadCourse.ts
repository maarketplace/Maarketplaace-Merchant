

export interface IAddCourse {
    courseName: string;
    coursePrice: number;
    courseDiscountedPrice:number;
    courseDescription: string;
    courseCategory: string;
    courseSubCategory: string;
    courseLocation: string;
    courseURL: string;
    courseImage: FileList | null;
}