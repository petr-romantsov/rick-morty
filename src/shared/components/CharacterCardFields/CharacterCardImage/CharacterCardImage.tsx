import { useEffect, useRef, useState } from 'react';

import './CharacterCardImage.scss';

type TCharacterCardImageProps = {
  image: string;
  alt: string;
};

const IMAGE_OBSERVER_THRESHOLD = '400px';

export const CharacterCardImage = ({ image, alt }: TCharacterCardImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [shouldLoadImage, setShouldLoadImage] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // установка обсервера для ленивой подгрузки изображения
  useEffect(() => {
    if (!imgRef.current || shouldLoadImage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadImage(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: IMAGE_OBSERVER_THRESHOLD
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [shouldLoadImage]);

  return (
    <div className='characterCardImage'>
      {shouldLoadImage && !imageLoaded && !imageError && (
        <span className='characterCardImage__loadingMessage'>Image is loading...</span>
      )}
      {shouldLoadImage && !imageError ? (
        <img
          className='characterCardImage__img'
          loading='lazy'
          alt={alt}
          ref={imgRef}
          src={image}
          width={300}
          height={300}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      ) : imageError ? (
        <span className='characterCardImage__errorMessage'>Image is not available :(</span>
      ) : (
        <div ref={imgRef} className='characterCardImage__placeholder'></div>
      )}
    </div>
  );
};
