import React, { useState } from "react";
import { IconHide } from "./Icons";
import { useForm } from "react-hook-form";
import { Tiptap } from "./Tiptap";

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
    date: "03.25.20",
    category: "",
    body: "",
    metaDescription: "",
    pageTitleTag: "",
  };

  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>(
    null
  );
  const [body, setBody] = useState("");
  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = handleSubmit((data) => console.log(data));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();

    reader.onload = function (event) {
      setImage(event.target?.result);
    };

    if (!e.target.files) return;
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleReset = () => {
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
          <label>Title</label>
          <div className="post-header-grid">
            <section className="title-textarea">
              <textarea {...register("title")}></textarea>
            </section>

            <section className="upload-image">
              <div className="file-group">
                {typeof image === "string" && <img src={image} />}
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

        {/* Body, min, date, category ============================== */}

        <div className="post-body">
          <div className="min-date-category">
            <input
              type="text"
              placeholder="min"
              {...register("readingTime")}
              className="redingTime"
            />

            <label htmlFor="">Date</label>
            <input
              type="text"
              defaultValue="03.25.20"
              {...register("date")}
              className="date"
            />

            <select {...register("category")}>
              <option value="">All</option>
              {category.map((cat) => (
                <option value={cat.label} key={cat.label}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <label>Body</label>
          <Tiptap setBody={setBody} />
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
