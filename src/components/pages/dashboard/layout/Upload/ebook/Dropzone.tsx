import FormField from "./FormField";

const DropzoneField = ({
    getRootProps,
    getInputProps,
    fileName,
    placeholder,
    error
}: {
    getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
    getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
    fileName: string;
    placeholder: string;
    error?: string;
}) => (
    <FormField label={placeholder.split(',')[0]} error={error} className="w-[100%] flex flex-col gap-[10px] max-[650px]:w-[100%]">
        <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-300 transition-colors duration-200 h-[80px] flex items-center justify-center cursor-pointer rounded-lg"
        >
            <input {...getInputProps()} />
            <p className="text-center text-sm text-gray-600 dark:text-gray-200 px-4 max-[650px]:text-[13px]">
                {fileName || placeholder}
            </p>
        </div>
    </FormField>
);
export default DropzoneField;
