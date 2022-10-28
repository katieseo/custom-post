import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { getCurrentDate } from "../utils/getCurrentDate";
import { IconHide } from "./Icons";
import Tiptap from "./Tiptap";
import Category from "./Post/Category";
import UploadImage from "./Post/UploadImage";

type FormValues = {
  title: string;
  image: File | null;
  imageDescription: string;
  readingTime: string | number;
  date: string;
  category: string;
  body: string;
  metaDescription: string;
  pageTitleTag: string;
};

// Post Component ==================================================

const Post = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>(
    null
  );
  const [selectedOption, setSelectedOption] = useState("All");

  const initialValues = {
    title: "",
    image: null,
    imageDescription: "",
    readingTime: "",
    date: getCurrentDate(),
    category: "All",
    body: "",
    metaDescription: "",
    pageTitleTag: "",
  };

  // React Hook Form ==========
  const methods = useForm<FormValues>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleReset = () => {
    setImage(null);
    setSelectedOption("All");
    reset(initialValues);
  };

  // JSX ==================================================

  return (
    <div className="post">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          {/* Discard, Save buttons ============================== */}

          <div className="post-actions">
            <IconHide />
            <button
              onClick={handleReset}
              className="button-secondary"
              type="button"
            >
              Discard
            </button>
            <button type="submit" className="button-primary">
              Save
            </button>
          </div>

          {/* Title, image upload ============================== */}

          <div className="post-header">
            <label htmlFor="title">Title</label>
            <div className="post-header-grid">
              <section className="title-textarea">
                <textarea {...register("title")} required id="title"></textarea>
              </section>

              <section className="upload-image">
                <UploadImage image={image} setImage={setImage} />

                <input
                  type="text"
                  placeholder="Image description"
                  className="image-description"
                />
              </section>
            </div>
          </div>

          {/* min, date, category, Body ============================== */}

          <div className="post-body">
            <div className="min-date-category">
              <div className="form-readingTime">
                <input type="text" {...register("readingTime")} readOnly />
                <span className="readingTime-min">min</span>
              </div>

              <div className="form-date">
                <label htmlFor="date" className="date-label">
                  Date
                </label>
                <input
                  type="text"
                  defaultValue={getCurrentDate()}
                  {...register("date")}
                  id="date"
                />
              </div>

              <Category
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>

            {/* Body (Tiptap) ============================== */}

            <label>Body</label>
            <Controller
              render={({ field }) => (
                <Tiptap onChange={field.onChange} body={field.value} />
              )}
              control={control}
              name="body"
              defaultValue=""
            />
          </div>

          {/* Meta description, page title tag  ============================== */}

          <div className="post-footer">
            <textarea
              {...register("metaDescription")}
              placeholder="Enter meta description"
              className="post-meta-description"
            ></textarea>
            <textarea
              {...register("pageTitleTag")}
              placeholder="Enter page title tag"
              className="post-page-title"
            ></textarea>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Post;
