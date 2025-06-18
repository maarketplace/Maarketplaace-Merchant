import FormField from "./FormField";

const InputField = ({
    label,
    placeholder,
    type = "text",
    register,
    error,
    disabled = false,
    value,
    description
}: {
    label: string;
    placeholder: string;
    type?: string;
    register?: Record<string, unknown>;
    error?: string;
    disabled?: boolean;
    value?: string | number | readonly string[] | undefined;
    description?: string;
}) => (
    <FormField label={label} error={error}>
        {description && (
            <p className="text-xs text-gray-500 -mt-2">{description}</p>
        )}
        <input
            placeholder={placeholder}
            type={type}
            value={value}
            disabled={disabled}
            className={`w-full h-[45px] bg-transparent outline-none px-3 py-2 text-sm border border-gray-300 rounded-md 
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'} 
        transition-colors duration-200 max-[650px]:text-[12px]`}
            {...(register || {})}
        />
    </FormField>
);
export default InputField;
