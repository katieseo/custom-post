import React, { useState } from "react";
import { IconHide } from "./Icons";
import { useForm, Controller } from "react-hook-form";
import { Tiptap } from "./Tiptap";
import { getCurrentDate } from "../utils/getCurrentDate";

type FormValues = {
  title: string;
  image: File | null;
  imageDescription: string;
  readingTime: number;
  date: string;
  category: string;
  body: string;
  metaDescription: string;
  pageTitleTag: string;
};

const Post = () => {
  const initialValues = {
    title: "",
    image: null,
    imageDescription: "",
    readingTime: 0,
    date: getCurrentDate(),
    category: "",
    body: "",
    metaDescription: "",
    pageTitleTag: "",
  };

  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const category = [
    { label: "Fundamentals" },
    { label: "Processing Times" },
    { label: "Politics & Policy" },
    { label: "Legal Drama" },
    { label: "Fraud" },
    { label: "Global Market" },
    { label: "Commentary" },
  ];

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();

    reader.onload = function (event) {
      setImage(event.target?.result);
    };

    if (!e.target.files) return;
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleReset = () => {
    setImage(null);
    reset(initialValues);
  };

  // JSX ==================================================

  return (
    <div className="post">
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
              <input
                type="text"
                placeholder="min"
                {...register("readingTime")}
                defaultValue={0}
              />
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

            <select {...register("category")}>
              <option value="">All</option>
              {category.map((cat) => (
                <option value={cat.label} key={cat.label}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Body  ============================== */}

          <label>Body</label>
          <Controller
            render={({ field }) => <Tiptap onChange={field.onChange} />}
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
    </div>
  );
};

export default Post;
