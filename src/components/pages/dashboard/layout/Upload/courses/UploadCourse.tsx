/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { uploadCourse } from "../../../../../../api/mutation";
import { IErrorResponse } from "../../../../../../interface/ErrorInterface";
import { IAddCourse } from "../../../../../../interface/UploadCourse";
import Loading from "../../../../../../loader";
import { UploadCourseSchema } from "../../../../../../schema/UploadCourseSchema";
import courseCategories, { courseLocations } from "../category/courseCategory";
import ProductToast from "../../notification";

const UploadCourse = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [paymentPrice, setPaymentPrice] = useState(0);
  const [visible, setVisible] = useState(false);

  const form = useForm<IAddCourse>({
    resolver: yupResolver(UploadCourseSchema) as any,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
    watch,
  } = form;
  const selectedCategory = watch("courseCategory");
  const productPrice = watch("coursePrice");
  const discountPrice = watch("courseDiscountedPrice");

  useEffect(() => {
    const calculatedPaymentPrice = (productPrice || 0) - (discountPrice || 0);
    setPaymentPrice(calculatedPaymentPrice >= 0 ? calculatedPaymentPrice : 0);
  }, [productPrice, discountPrice]);

  const { mutate, isLoading } = useMutation(["uploadebook"], uploadCourse, {
    onSuccess: async (data) => {
      toast.success(
        `${data?.data?.data?.message} We are currently reviewing your course it will take atleast 24 hours or less`,
        {
          duration: 10000,
          style: {
            border: "1px solid #FFC300",
            padding: "16px",
            color: "#333",
            backgroundColor: "#FFF9E6",
            borderRadius: "8px",
            fontSize: "14px",
            textAlign: "center",
          },
          icon: "📘",
        }
      );

      reset({
        courseName: "",
        coursePrice: 0,
        courseDiscountedPrice: 0,
        courseDescription: "",
        courseCategory: "",
        courseSubCategory: "",
        courseLocation: "",
        courseURL: "",
        courseImage: null,
        author: "",
        duration: "",
      });
      setSelectedFileName("");
      setDescription("");
      setVisible(true);
      navigate("/dashboard");
    },
    onError: (err: IErrorResponse) => {
      toast.error(err?.response?.data?.message);
      if (
        err?.response?.data?.message ===
        "Authorization denied. merchant not found! "
      ) {
        toast.error("session expired please login again");
        navigate("/");
      }
    },
  });

  const onSubmit: SubmitHandler<IAddCourse> = (data) => {
    const { courseImage, ...others } = data;
    mutate({
      ...others,
      courseImage: courseImage && courseImage.length > 0 ? courseImage : null,
    });
  };

  const handleButtonClick = () => {
    handleSubmit(onSubmit)();
  };

  const onDropProductImage = (acceptedFiles: File[]) => {
    const fileList = new DataTransfer();
    acceptedFiles.forEach((file) => fileList.items.add(file));
    setValue("courseImage", fileList.files);
    setSelectedFileName(acceptedFiles[0]?.name || "");
  };

  const {
    getRootProps: getProductImageRootProps,
    getInputProps: getProductImageInputProps,
  } = useDropzone({
    onDrop: onDropProductImage,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
  });

  const filteredSubCategories =
    courseCategories.find((category) => category.name === selectedCategory)
      ?.courseSubcategories || [];

  const courseName = watch("courseName");

  return (
    <div className="min-h-screen dark:bg-gray-900 p-4 md:p-6 no-scrollbar">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h3 className="text-3xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 mt-5">
            Upload a Course
          </h3>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            Show the world what you are selling
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white max-[650px]:bg-none dark:bg-gray-800 rounded-lg shadow-sm max-[650px]:shadow-none border max-[650px]:border-none border-gray-200 dark:border-gray-700 p-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Course Information
              </h4>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Name
                  </label>
                  <input
                    placeholder="Course Name"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    {...register("courseName")}
                  />
                  {errors.courseName?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.courseName?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Price
                  </label>
                  <p className="text-xs text-gray-500 mb-2">(original price)</p>
                  <input
                    placeholder="Course Price"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    {...register("coursePrice")}
                  />
                  {errors.coursePrice?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.coursePrice?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Discounted Price
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    (amount to remove from the original price)
                  </p>
                  <input
                    placeholder="Course Discounted Price"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    {...register("courseDiscountedPrice")}
                  />
                  {errors.courseDiscountedPrice?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.courseDiscountedPrice?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Price
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    (payment price for buyers)
                  </p>
                  <input
                    type="number"
                    value={paymentPrice}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Location
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    {...register("courseLocation")}
                  >
                    {courseLocations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  {errors.courseLocation?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.courseLocation?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={(value) => {
                      setDescription(value);
                      setValue("courseDescription", value);
                    }}
                  />
                  {errors.courseDescription?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.courseDescription?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Additional Details
              </h4>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Category
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    {...register("courseCategory")}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {courseCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.courseCategory?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.courseCategory?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Sub Category
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                    {...register("courseSubCategory")}
                    disabled={!selectedCategory}
                  >
                    <option value="" disabled>
                      Select a subcategory
                    </option>
                    {filteredSubCategories.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.name}>
                        {subCategory.name}
                      </option>
                    ))}
                  </select>
                  {errors.courseSubCategory?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.courseSubCategory?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course URL
                  </label>
                  <input
                    placeholder="Course URL"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    {...register("courseURL")}
                  />
                  {errors.courseURL?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.courseURL?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Author
                  </label>
                  <input
                    placeholder="Course Author"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    {...register("author")}
                  />
                  {errors.author?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.author?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Duration
                  </label>
                  <input
                    placeholder="Course Duration"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    {...register("duration")}
                  />
                  {errors.duration?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.duration?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add Course Image
                  </label>
                  <div
                    {...getProductImageRootProps()}
                    className="w-full min-h-[120px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-yellow-400 transition-colors p-6"
                  >
                    <input {...getProductImageInputProps()} />
                    {selectedFileName ? (
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedFileName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Drag & drop an image here, or click to select
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, JPEG, GIF
                        </p>
                      </div>
                    )}
                  </div>
                  {errors.courseImage?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.courseImage?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              disabled={isLoading || !isValid}
              className={`w-full h-12 rounded-lg text-lg font-semibold transition-all duration-200 ${
                isLoading || !isValid
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
              type="button"
              onClick={handleButtonClick}
            >
              {isLoading ? <Loading /> : "Upload Course"}
            </button>
          </div>
        </div>
      </div>

      {visible ? (
        <ProductToast
          productName={courseName}
          productUrl={`https://www.maarketplaace.com/details/`}
          setVisible={setVisible}
        />
      ) : null}
    </div>
  );
};

export default UploadCourse;
