  

  import * as yup from 'yup';

  export const UploadCourseSchema = yup.object({
    courseName: yup.string().required('Course name is required'),
    coursePrice: yup.number().required('Course price is required'),
    courseDiscountedPrice: yup.number().required('Course discounted price is required'),
    courseDescription: yup.string().required('Course Description is required'),
    courseImage: yup
    .mixed()
    .required("Product image is required").test({
        name: "required",
        message: "Image is required",
        test: (value: any) => value?.length > 0
    }),
    courseCategory: yup.string().required('Course category is required'),
    courseSubCategory: yup.string().required('Course sub category is required'),
    courseLocation: yup.string().required('Course location is required'),
    courseURL: yup.string().required('Course URL is required'),
    
  })