/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { uploadEbook } from "../../../../../../api/mutation";
import { IErrorResponse } from "../../../../../../interface/ErrorInterface";
import { IAddEbook } from "../../../../../../interface/UploadEbook";
import Loading from "../../../../../../loader";
import { UploadEbookSchema } from "../../../../../../schema/UploadEbookSchema";
import { categories } from "../category";
import FormField from "./FormField";
import DropzoneField from "./Dropzone";
import InputField from "./InputField";
import { useProductStore } from "../../../../../../store";
import { Plus, ShoppingCart, Ticket, TrendingUp, X } from "lucide-react";
import ProductCard, {
  BalanceCard,
  ProductCardProps,
} from "../../../../../../utils/ui/card";
import { EmptyState } from "../../store";
import { getProductAnalytics } from "../../../../../../api/query";
import { formatNumber } from "../../../../../../utils/Utils";
import { TbCurrencyNaira } from "react-icons/tb";

interface IAnalyticsData {
  totalProduct: number;
  revenue: number;
  totalPurchase: number;
  averagePrice: number;
  products: ProductCardProps["product"][];
}

function UploadEbook() {
  const navigate = useNavigate();
  const [productImageName, setProductImageName] = useState("");
  const [eBookName, setEBookName] = useState("");
  const [paymentPrice, setPaymentPrice] = useState(0);
  const { setProductId, setProductName } = useProductStore();
  const [showAddEbook, setShowAddEbook] = useState<boolean>(false);

  const form = useForm<IAddEbook>({
    resolver: yupResolver(UploadEbookSchema) as any,
    mode: "onBlur",
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;
  const selectedCategory = watch("category");
  const productPrice = watch("productPrice");
  const discountPrice = watch("discountPrice");

  const calculatedPaymentPrice = useMemo(() => {
    const price = (productPrice || 0) - (discountPrice || 0);
    return price >= 0 ? price : 0;
  }, [productPrice, discountPrice]);

  useEffect(() => {
    setPaymentPrice(calculatedPaymentPrice);
  }, [calculatedPaymentPrice]);

  const handleSuccess = useCallback(
    async (data: any) => {
      setProductId(data?.data?.data?.data?._id);
      setProductName(data?.data?.data?.data?.productName);

      toast.success(data?.data?.message || "Ebook uploaded successfully!", {
        duration: 5000,
        style: {
          border: "1px solid #10B981",
          padding: "16px",
          color: "#065F46",
          backgroundColor: "#ECFDF5",
          borderRadius: "8px",
          fontSize: "14px",
        },
      });

      reset({
        productName: "",
        productDescription: "",
        productPrice: 0,
        discountPrice: 0,
        category: "",
        subCategory: "",
        productLocation: "",
        productImage: undefined,
        eBook: undefined,
        pages: 0,
        author: "",
        duration: "",
        whatToExpect: "",
        topics: "",
      });

      setProductImageName("");
      setEBookName("");
      navigate("/dashboard");
    },
    [setProductId, setProductName, reset, navigate]
  );

  const handleError = useCallback((err: IErrorResponse) => {
    toast.error(
      err?.response?.data?.message || "Upload failed. Please try again.",
      {
        duration: 5000,
        style: {
          border: "1px solid #EF4444",
          padding: "16px",
          color: "#991B1B",
          backgroundColor: "#FEF2F2",
          borderRadius: "8px",
          fontSize: "14px",
        },
      }
    );
  }, []);
  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useQuery(
    ["ebookAnalytics", "ebook"],
    () => getProductAnalytics("ebook"),
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
  const { mutate, isLoading } = useMutation({
    mutationFn: uploadEbook,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = useCallback(
    async (data: IAddEbook) => {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("productDescription", data.productDescription);
      formData.append("productPrice", String(data.productPrice));
      formData.append("discountPrice", String(data.discountPrice));
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("productLocation", data.productLocation ?? "");
      formData.append("pages", String(data.pages));
      formData.append("author", data.author);
      formData.append("duration", data.duration);
      formData.append("whatToExpect", data.whatToExpect ?? "");
      formData.append("topics", data.topics ?? "");

      if (data.productImage && data.productImage.length > 0) {
        formData.append("productImage", data.productImage[0]);
      }

      if (data.eBook && data.eBook.length > 0) {
        formData.append("eBook", data.eBook[0]);
      }

      mutate(formData);
    },
    [mutate]
  );

  const onDropProductImage = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const fileList = new DataTransfer();
        acceptedFiles.forEach((file) => fileList.items.add(file));
        setValue("productImage", fileList.files);
        setProductImageName(acceptedFiles[0].name);
      }
    },
    [setValue]
  );

  const onDropEbook = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const fileList = new DataTransfer();
        fileList.items.add(acceptedFiles[0]);
        setValue("eBook", fileList.files);
        setEBookName(acceptedFiles[0].name);
      }
    },
    [setValue]
  );

  const productImageDropzone = useDropzone({
    onDrop: onDropProductImage,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  const ebookDropzone = useDropzone({
    onDrop: onDropEbook,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
      "application/msword": [".doc", ".docx"],
    },
    maxFiles: 1,
    maxSize: 9.5 * 1024 * 1024,
  });

  const categoryOptions = useMemo(
    () =>
      Object.keys(categories).map((categoryKey) => (
        <option key={categoryKey} value={categoryKey}>
          {categoryKey}
        </option>
      )),
    []
  );

  const subcategoryOptions = useMemo(
    () =>
      selectedCategory
        ? categories[selectedCategory]?.subcategories?.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          )) || []
        : [],
    [selectedCategory]
  );
  const cards = [
    {
      title: "Total eBook",
      balance: analyticsData?.totalProduct || 0,
      icon: <Ticket className="w-6 h-6" />,
    },
    {
      title: "Revenue",
      balance: formatNumber(analyticsData?.revenue || 0),
      icon: <TbCurrencyNaira className="w-6 h-6" />,
    },
    {
      title: "Total eBook Sold",
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
    <div className="min-h-[100%] p-4 md:p-6 scrollbar-hide overflow-hidden">
      <div className="px-4 py-3 max-[650px]:p-0 max-[650px]:mt-6 flex justify-between items-end max-[650px]:flex-col max-[650px]:items-start gap-2">
        <span className="text-gray-900 dark:text-white mb-0 pb-0 flex justify-center flex-col gap-2">
          <h1 className="text-3xl text-[#FFC300]">Upload an eBook</h1>
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
            Add eBook
          </button>
        )}
      </div>
      {showAddEbook ? null : (
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
      {showAddEbook ? (
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <div className="dark:text-whiite p-4 max-w-4xl mx-auto">
              <p className="text-sm text-black dark:text-gray-300">
                📋 <strong>Important:</strong> Ebook file size must be below 9.5
                MB. Need to compress? Use this{" "}
                <a
                  href="https://www.ilovepdf.com/compress_pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-800 underline font-medium"
                >
                  PDF compressor
                </a>
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="space-y-6 ">
              <div className="max-[650px]:bg-none rounded-lg max-[650px]:shadow-none p-4 max-[650px]:p-0 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white max-[650px]:border-none mb-6">
                  Basic Information
                </h2>

                <InputField
                  label="Book Name"
                  placeholder="Enter book name"
                  register={register("productName")}
                  error={errors.productName?.message}
                />

                <InputField
                  label="Book Price"
                  placeholder="Enter original price"
                  type="number"
                  description="Original price before any discounts"
                  register={register("productPrice")}
                  error={errors.productPrice?.message}
                />

                <InputField
                  label="Discount Amount"
                  placeholder="Enter discount amount"
                  type="number"
                  description="Amount to subtract from original price"
                  register={register("discountPrice")}
                  error={errors.discountPrice?.message}
                />

                <InputField
                  label="Final Price"
                  placeholder="Calculated automatically"
                  type="number"
                  description="Price customers will pay"
                  value={paymentPrice}
                  disabled={true}
                />

                <InputField
                  label="Author Name"
                  placeholder="Enter author name"
                  register={register("author")}
                  error={errors.author?.message}
                />

                <InputField
                  label="Reading Duration"
                  placeholder="e.g., 2-3 hours"
                  register={register("duration")}
                  error={errors.duration?.message}
                />

                <InputField
                  label="Number of Pages"
                  placeholder="Enter page count"
                  type="number"
                  register={register("pages")}
                  error={errors.pages?.message}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="max-[650px]:bg-none rounded-lg max-[650px]:shadow-none p-4 max-[650px]:p-0 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white max-[650px]:border-none mb-6">
                  Categories & Files
                </h2>

                <FormField
                  label="Book Description"
                  error={errors.productDescription?.message}
                >
                  <div className="quill-container">
                    <ReactQuill
                      theme="snow"
                      placeholder="Describe your book..."
                      onChange={(value) =>
                        setValue("productDescription", value)
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

                <FormField
                  label="Book Category"
                  error={errors.category?.message}
                  className="mt-8"
                >
                  <select
                    className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md bg-transparent hover:border-gray-400 focus:border-blue-500 focus:ring-1 transition-colors duration-200 mt-4"
                    {...register("category")}
                  >
                    <option value="">Select a category</option>
                    {categoryOptions}
                  </select>
                </FormField>

                {selectedCategory && (
                  <FormField
                    label="Book Subcategory"
                    error={errors.subCategory?.message}
                    className="mt-4"
                  >
                    <select
                      className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md bg-transparent hover:border-gray-400 focus:border-blue-500 focus:ring-1 transition-colors duration-200 mt-4"
                      {...register("subCategory")}
                    >
                      <option value="">Select a subcategory</option>
                      {subcategoryOptions}
                    </select>
                  </FormField>
                )}

                <DropzoneField
                  getRootProps={productImageDropzone.getRootProps}
                  getInputProps={productImageDropzone.getInputProps}
                  fileName={productImageName}
                  placeholder="Add Book Cover Image"
                  error={errors.productImage?.message}
                />

                <DropzoneField
                  getRootProps={ebookDropzone.getRootProps}
                  getInputProps={ebookDropzone.getInputProps}
                  fileName={eBookName}
                  placeholder="Add Ebook File (PDF, DOC, PPT - Max 9.5MB)"
                  error={errors.eBook?.message}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-12 rounded-lg text-lg font-semibold transition-all duration-200 mt-4 ${
                    isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:shadow-lg transform hover:-translate-y-0.5"
                  }`}
                >
                  {isLoading ? <Loading /> : "Upload Ebook"}
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
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
            title="No eBook uploaded yet"
            description="Start adding eBook here"
          />
        )}
    </div>
  );
}

export default UploadEbook;
