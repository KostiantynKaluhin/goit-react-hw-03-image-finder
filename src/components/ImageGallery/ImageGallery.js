import s from "./ImageGallery.module.css";
import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, showImageHandler }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL }, index) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            showImageHandle={showImageHandler(largeImageURL)}
            index={index}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
