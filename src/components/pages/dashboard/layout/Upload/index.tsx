import { useState } from 'react'
import UploadEbook from './UploadEbook';
import UploadCourse from './UploadCourse';
const Upload = () => {
    const [showMerchantTable, setShowMerchantTable] = useState(true);
    return (
        <div className='w-full flex items-center flex-col'>
            <div className="flex gap-[10px] w-full ml-[20px] border-b border-[grey] p-[10px]">
                <button
                    type="button"
                    onClick={() => setShowMerchantTable(true)}
                    className={showMerchantTable ? 'bg-[#ffc300] p-[4px] rounded-[5px] text-black' : 'p-[4px] rounded-[5px]'}
                >
                    Upload Ebook
                </button>
                <button
                    type="button"
                    onClick={() => setShowMerchantTable(false)}
                    className={!showMerchantTable ? 'bg-[#ffc300] p-[4px] rounded-[5px] text-black' : 'p-[4px] rounded-[5px] '}
                >
                    Upload Course
                </button>
            </div>
            <div className='marquee flex w-[70%] justify-center '>
                <p>The ebook file size must be below 9.5 MB. If your file exceeds this limit, please compress it using this <a href="https://www.ilovepdf.com/compress_pdf" className='text-blue-500'>PDF compressor</a>.</p>
            </div>
            <div className='w-full'>
                {
                    showMerchantTable ? <UploadEbook /> : <UploadCourse />
                }
            </div>
        </div>
    )
}

export default Upload