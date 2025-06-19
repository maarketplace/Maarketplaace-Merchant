import { useState } from "react";
import { X, Copy } from "lucide-react";

type ProductToastProps = {
  productName: string;
  productUrl: string;
  setVisible: (value: boolean) => void;
};

export default function ProductToast({
  productName,
  productUrl,
  setVisible,
}: ProductToastProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm w-full bg-white shadow-lg rounded-xl border border-gray-200 animate-slide-in transition-transform">
      <div className="flex items-start p-4">
        <div className="flex-1">
          <p className="text-sm text-gray-800">
            Product <strong>{productName}</strong> created.
            <a
              href={productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View it here
            </a>
          </p>
        </div>
        <button
          onClick={copyLink}
          className="ml-2 text-gray-500 hover:text-gray-800"
          title="Copy link"
        >
          {copied ? "✅" : <Copy size={16} />}
        </button>
        <button
          onClick={() => {
            setVisible(false);
          }}
          className="ml-2 text-gray-500 hover:text-gray-800"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
