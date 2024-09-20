import React from 'react';
import Loader from './loader.svg';

interface LoadingProps {
  width?: string;
  height?: string;
}

const Loading: React.FC<LoadingProps> = ({ width = "100%", height = "100%" }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={Loader}
        alt="loading"
        style={{ width, height }}
        className="rounded-full"
      />
    </div>
  );
}

export default Loading 