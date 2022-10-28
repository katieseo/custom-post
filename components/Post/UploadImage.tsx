import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

type ImagePropsValues = {
  image: string | ArrayBuffer | null | undefined;
  setImage: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null | undefined>
  >;
};

const UploadImage = ({ image, setImage }: ImagePropsValues) => {
  const { register, setValue } = useFormContext();

  // Render uploaded image ==========

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();

    reader.onload = function (event) {
      setImage(event.target?.result);
    };

    if (!e.target.files) return;
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setImage(null);
    setValue("image", "null");
  };

  return (
    <div className="file-group">
      <input
        type="file"
        {...register("image")}
        accept="image/*"
        onChange={handleFileChange}
      />
      {typeof image === "string" && (
        <>
          <img src={image} />
          {image && (
            <span onClick={handleRemoveFile} className="remove-image-icon">
              x
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default UploadImage;
