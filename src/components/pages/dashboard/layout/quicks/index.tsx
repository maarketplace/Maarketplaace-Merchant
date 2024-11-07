import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useDropzone } from 'react-dropzone';
import { uploadQuicks } from '../../../../../api/mutation';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../../../../../loader';

const UploadQuicks: React.FC = () => {
    const { id } = useParams();

    const [file, setFile] = useState<File | null>(null); // Single file input for image or video
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Multiple images
    const [description, setDescription] = useState(''); // Description input

    const mutation = useMutation((data: { description: string; file: File; images?: File[] }) =>
        uploadQuicks(id as string, data)
    );

    const handleFileDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const handleImagesDrop = useCallback((acceptedFiles: File[]) => {
        setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
    }, []);

    const handleUpload = () => {
        if (!description || !file) {  // Only check for description and file
            alert("Please provide both a description and a file.");
            return;
        }

        const data = {
            description,
            file,
            images: selectedFiles.length > 0 ? selectedFiles : undefined, // Set images if present, otherwise undefined
        };

        mutation.mutate(data, {
            onSuccess: (data) => {
                console.log('Upload successful:', data);
                toast.success('Data uploaded successfully');
                setFile(null);
                setSelectedFiles([]);
                setDescription('');
            },
            onError: (error) => {
                console.error('Upload failed:', error);
                toast.error('Failed to upload quicks');
            },
        });
    };

    const { getRootProps: getFileRootProps, getInputProps: getFileInputProps, isDragActive: isFileDragActive } = useDropzone({
        onDrop: handleFileDrop,
        accept: { 'image/*': [], 'video/*': [] },
        multiple: false,
    });

    const { getRootProps: getImagesRootProps, getInputProps: getImagesInputProps, isDragActive: isImagesDragActive } = useDropzone({
        onDrop: handleImagesDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    return (
        <div className="w-full h-[80vh] flex items-center justify-center gap-5 flex-col mt-[40px]">
            {/* Single File Dropzone (Image or Video) */}
            <div {...getFileRootProps()} className="w-[30%] max-[650px]:w-full h-[60px] border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer mb-4">
                <input {...getFileInputProps()} />
                {isFileDragActive ? (
                    <p className="text-blue-50 text-center">Drop the file here...</p>
                ) : (
                    <p className="text-gray-500 text-[12px] text-center">Drag and drop an image or video here, or click to select</p>
                )}
            </div>
            {file && (
                <div className="mb-4">
                    {file.type.startsWith('image/') ? (
                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-32 h-32 object-cover" />
                    ) : (
                        <video src={URL.createObjectURL(file)} className="w-32 h-32 object-cover" controls />
                    )}
                </div>
            )}

            {/* Multiple Images Dropzone */}
            <div {...getImagesRootProps()} className="w-[30%] max-[650px]:w-full h-[60px] border-2 border-dashed border-[#FFC300] flex items-center justify-center cursor-pointer">
                <input {...getImagesInputProps()} />
                {isImagesDragActive ? (
                    <p className="text-blue-500 text-center">Drop the images here...</p>
                ) : (
                    <p className="text-gray-500 text-[12px] text-center">Drag and drop multiple images here, or click to select</p>
                )}
            </div>

            {selectedFiles.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {selectedFiles.map((file, index) => (
                        <img key={index} src={URL.createObjectURL(file)} alt={file.name} className="w-32 h-32 object-cover" />
                    ))}
                </div>
            )}

            {/* Description Input */}
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-[30%] max-[650px]:w-full h-[100px] outline-none p-2 border border-gray-300 rounded mb-4"
                rows={4}
            />

            {/* Upload Button */}
            <button className="w-[30%] max-[650px]:w-full h-[40px] bg-[#FFC300] text-white rounded" onClick={handleUpload} disabled={mutation.isLoading}>
                {mutation.isLoading ? <Loading/> : 'Upload Quicks'}
            </button>
        </div>
    );
};

export default UploadQuicks;
