const FormField = ({
    label,
    error,
    children,
    className = "w-[100%] flex flex-col gap-[15px]"
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={className}>
        <label className="text-sm font-medium text-gray-700 dark:text-white max-[650px]:text-[15px] mt-2">
            {label}
        </label>
        {children}
        {error && (
            <span className="text-red-500 text-xs font-medium">
                {error}
            </span>
        )}
    </div>
);
export default FormField;
