/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { uploadCourse } from "../../../../../../api/mutation";
import { IErrorResponse } from "../../../../../../interface/ErrorInterface";
import { IAddCourse } from "../../../../../../interface/UploadCourse";
import Loading from "../../../../../../loader";
import { UploadCourseSchema } from "../../../../../../schema/UploadCourseSchema";
import courseCategories, { courseLocations } from "../category/courseCategory";
import { useProductStore } from "../../../../../../store";
import { Ticket, ShoppingCart, TrendingUp, Plus, X } from "lucide-react";
import { EmptyState } from "../../store";
import InputField from "../ebook/InputField";
import FormField from "../ebook/FormField";
import DropzoneField from "../ebook/Dropzone";
import { getProductAnalytics } from "../../../../../../api/query";
import { formatNumber } from "../../../../../../utils/Utils";
import ProductCard, {
  BalanceCard,
  ProductCardProps,
} from "../../../../../../utils/ui/card";
import { TbCurrencyNaira } from "react-icons/tb";

interface IAnalyticsData {
  totalProduct: number;
  revenue: number;
  totalPurchase: number;
  averagePrice: number;
  products: ProductCardProps["product"][];
}

const UploadCourse = () => {
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [paymentPrice, setPaymentPrice] = useState(0);
  const { setProductId, setProductName } = useProductStore();
  const [showAddEbook, setShowAddEbook] = useState<boolean>(false);

  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useQuery(
    ["courseAnalytics", "course"],
    () => getProductAnalytics("course"),
    {
      select: (data) => data?.data?.data as IAnalyticsData,
      onError: (err: IErrorResponse) => {
        console.error("Failed to fetch analytics:", err);
        toast.error("Failed to load analytics data");
      },
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const form = useForm<IAddCourse>({
    resolver: yupResolver(UploadCourseSchema) as any,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
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
      setProductId(data?.data?.data?.id);
      setProductName(data?.data?.data?.data?.productName);

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

      refetchAnalytics();

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

  const onSubmit = (data: IAddCourse) => {
    const formData = new FormData();

    formData.append("courseName", data.courseName);
    formData.append("coursePrice", data.coursePrice.toString());
    formData.append(
      "courseDiscountedPrice",
      data.courseDiscountedPrice.toString()
    );
    formData.append("courseDescription", data.courseDescription);
    formData.append("courseCategory", data.courseCategory);
    formData.append("courseSubCategory", data.courseSubCategory);
    formData.append("courseLocation", data.courseLocation);
    formData.append("courseURL", data.courseURL);
    formData.append("author", data.author);
    formData.append("duration", data.duration);

    if (data.courseImage && data.courseImage.length > 0) {
      formData.append("courseImage", data.courseImage[0]);
    }

    mutate(formData);
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

  const cards = [
    {
      title: "Total Course",
      balance: analyticsData?.totalProduct || 0,
      icon: <Ticket className="w-6 h-6" />,
    },
    {
      title: "Revenue",
      balance: formatNumber(analyticsData?.revenue || 0),
      icon: <TbCurrencyNaira className="w-6 h-6" />,
    },
    {
      title: "Total Course Sold",
      balance: analyticsData?.totalPurchase || 0,
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      title: "Avg. Price",
      balance: formatNumber(analyticsData?.averagePrice || 0),
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 no-scrollbar">
      <div className="px-4 py-3 max-[650px]:p-0 max-[650px]:mt-6 flex justify-between items-end max-[650px]:flex-col max-[650px]:items-start gap-2">
        <span className="text-gray-900 dark:text-white mb-0 pb-0 flex justify-center flex-col gap-2">
          <h1 className="text-3xl text-[#FFC300]">Upload a Course</h1>
          <p className="text-lg  dark:text-yellow-100">
            Share your knowledge with the world
          </p>
        </span>
        {showAddEbook ? (
          <button
            className="cursor-pointer w-[150px] h-[40px] rounded-lg bg-[#FFc300] dark:text-black flex items-center justify-center gap-2 "
            onClick={() => setShowAddEbook(!showAddEbook)}
          >
            <X size={18} />
            Close form
          </button>
        ) : (
          <button
            className="cursor-pointer w-[150px] h-[40px] rounded-lg bg-[#FFc300] dark:text-black flex items-center justify-center gap-2 "
            onClick={() => setShowAddEbook(!showAddEbook)}
          >
            <Plus size={18} />
            Add Course
          </button>
        )}
      </div>

      {!showAddEbook && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 p-4 max-[650px]:p-0 max-[650px]:mt-6">
          {cards.map((card, index) => (
            <BalanceCard
              key={index}
              title={card.title}
              balance={card.balance}
              icon={card.icon}
              isLoading={isAnalyticsLoading}
            />
          ))}
        </div>
      )}

      {analyticsError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">
            Failed to load analytics data.
            <button
              onClick={() => refetchAnalytics()}
              className="ml-2 text-red-800 underline hover:no-underline"
            >
              Try again
            </button>
          </p>
        </div>
      )}

      {showAddEbook && (
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="max-[650px]:bg-none rounded-lg max-[650px]:shadow-none p-4 max-[650px]:p-0 border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Course Information
                </h4>

                <div className="space-y-6">
                  <InputField
                    label="Course Name"
                    placeholder="Enter course name"
                    register={register("courseName")}
                    error={errors.courseName?.message}
                    type="text"
                  />

                  <InputField
                    label=" Course Price"
                    placeholder="Enter original price"
                    type="number"
                    description="Original price before any discounts"
                    register={register("coursePrice")}
                    error={errors.coursePrice?.message}
                  />

                  <InputField
                    label="Course Discounted Price"
                    placeholder="Enter discount amount"
                    type="number"
                    description="Amount to subtract from original price"
                    register={register("courseDiscountedPrice")}
                    error={errors.courseDiscountedPrice?.message}
                  />

                  <InputField
                    label="Final Price"
                    placeholder="Calculated automatically"
                    type="number"
                    description="Price customers will pay"
                    value={paymentPrice}
                    disabled={true}
                  />

                  <FormField
                    label="Book Category"
                    error={errors.courseLocation?.message}
                    className="mt-8"
                  >
                    <select
                      className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md bg-transparent hover:border-gray-400 focus:border-blue-500 focus:ring-1 transition-colors duration-200 mt-4"
                      {...register("courseLocation")}
                    >
                      {courseLocations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField
                    label="Course Description"
                    error={errors.courseDescription?.message}
                  >
                    <div className="quill-container">
                      <ReactQuill
                        theme="snow"
                        placeholder="Describe your book..."
                        onChange={(value) =>
                          setValue("courseDescription", value)
                        }
                        className="dark:text-white text-black rounded-lg"
                        modules={{
                          toolbar: [
                            ["bold", "italic", "underline"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link"],
                          ],
                        }}
                      />
                    </div>
                    <style>{`
                                .quill-container {
                                height: 100px;
                                }
                                .quill-container .ql-container {
                                height: calc(120px - 42px);
                                overflow-y: auto;
                                }
                              `}</style>
                  </FormField>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="max-[650px]:bg-none rounded-lg max-[650px]:shadow-none p-4 max-[650px]:p-0 border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Additional Details
                </h4>

                <div className="space-y-6">
                  <FormField
                    label="Course Category"
                    error={errors.courseCategory?.message}
                    className="mt-8"
                  >
                    <select
                      className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md bg-transparent hover:border-gray-400 focus:border-blue-500 focus:ring-1 transition-colors duration-200 mt-2"
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
                  </FormField>

                  {selectedCategory && (
                    <FormField
                      label="Course Subcategory"
                      error={errors.courseSubCategory?.message}
                      className="mt-4"
                    >
                      <select
                        className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md bg-transparent hover:border-gray-400 focus:border-blue-500 focus:ring-1 transition-colors duration-200 mt-2"
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
                    </FormField>
                  )}

                  <InputField
                    label="Course URL"
                    placeholder="Course URL"
                    type="text"
                    register={register("courseURL")}
                    error={errors.courseURL?.message}
                  />

                  <InputField
                    label="Course Author"
                    placeholder="Course Author"
                    type="text"
                    register={register("author")}
                    error={errors.author?.message}
                  />

                  <InputField
                    label="Course Duration"
                    placeholder="Course Duration"
                    type="text"
                    register={register("duration")}
                    error={errors.duration?.message}
                  />

                  <DropzoneField
                    getRootProps={getProductImageRootProps}
                    getInputProps={getProductImageInputProps}
                    fileName={selectedFileName}
                    placeholder="Click To Add Course Image"
                    error={errors.courseImage?.message}
                  />
                </div>
                <button
                  disabled={isLoading}
                  className={`w-full h-12 rounded-lg text-lg font-semibold transition-all duration-200 mt-4 ${
                    isLoading
                      ? "bg-yellow-300 text-gray-900 cursor-not-allowed"
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
        </div>
      )}

      {!showAddEbook &&
        analyticsData?.products &&
        analyticsData.products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 p-4 max-[650px]:p-0 max-[650px]:mt-6">
            {analyticsData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      {!showAddEbook &&
        (!analyticsData?.products || analyticsData.products.length === 0) && (
          <EmptyState
            onClick={() => setShowAddEbook(true)}
            title="No course uploaded yet"
            description="Start adding your courses here"
          />
        )}
    </div>
  );
};

export default UploadCourse;
