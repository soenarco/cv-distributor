import React from 'react';

interface CardImageProps {
  source: string;
  alt: string;
}

const CardImage = ({ source, alt }: CardImageProps) => {
  return (
    <div className="w-full h-[200px] mx-auto">
      <img
        alt={alt}
        src={source}
        className="w-full h-full object-contain rounded-t-md group-hover:opacity-75"
      />
    </div>
  );
};

export default CardImage;
