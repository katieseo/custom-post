import { useState } from "react";
import { useFormContext } from "react-hook-form";

type OptionPropsValues = {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

const Category = ({ selectedOption, setSelectedOption }: OptionPropsValues) => {
  const [toggleSelect, setToggleSelect] = useState(false);
  const { register, setValue } = useFormContext();

  const category = [
    { label: "All" },
    { label: "Fundamentals" },
    { label: "Processing Times" },
    { label: "Politics & Policy" },
    { label: "Legal Drama" },
    { label: "Fraud" },
    { label: "Global Market" },
    { label: "Commentary" },
  ];

  return (
    <div className="post--category">
      <select {...register("category")}>
        <option value="">All</option>
        {category.map((cat) => (
          <option value={cat.label} key={cat.label}>
            {cat.label}
          </option>
        ))}
      </select>
      <div className={toggleSelect ? "custom-select" : "custom-select close"}>
        <div
          className="custom-select--select"
          onClick={() => setToggleSelect(!toggleSelect)}
        >
          {selectedOption}
        </div>
        <ul
          className="custom-select--option"
          onClick={() => setToggleSelect(false)}
        >
          {category.map((cat) => (
            <li
              key={cat.label}
              onClick={() => {
                setSelectedOption(cat.label);
                setValue("category", cat.label);
              }}
              className={selectedOption === cat.label ? "selected" : ""}
            >
              {cat.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
