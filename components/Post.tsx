import React, { useState } from "react";
import { IconHide } from "./Icons";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Tiptap } from "./Tiptap";
import { getCurrentDate } from "../utils/getCurrentDate";
import { getReadingTime } from "../utils/getReadingTime";
import Category from "./Post/Category";

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

  // Render uploaded image ==========

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();

    reader.onload = function (event) {
      setImage(event.target?.result);
    };

    if (!e.target.files) return;
    reader.readAsDataURL(e.target.files[0]);
  };

  // React Hook Form ==========
  const methods = useForm<FormValues>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleReset = () => {
    setImage(null);
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
                <div className="file-group">
                  {typeof image === "string" && (
                    <>
                      <img src={image} />
                    </>
                  )}
                  <input
                    type="file"
                    {...register("image")}
                    onChange={handleFileChange}
                  />
                </div>

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

              <Category />
            </div>

            {/* Body (Tiptap) ============================== */}

            <label>Body</label>
            <Controller
              render={({ field }) => (
                <Tiptap
                  onChange={field.onChange}
                  body={field.value}
                  setValue={setValue}
                />
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
