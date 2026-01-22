import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BookForm = ({ onSubmit, defaultValues }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues
  });

  const descLength = watch("description")?.length || 0;

  /* ===== styles ===== */
const card = {
  maxWidth: "420px",
  margin: "40px auto",
  background: "#fff",
  padding: "24px 28px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  boxSizing: "border-box"
};


  const title = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px"
  };

  const field = { marginBottom: "14px" };

  const label = {
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "4px",
    display: "block"
  };

const input = (error) => ({
  width: "100%",
  padding: "10px 12px",
  fontSize: "14px",
  borderRadius: "6px",
  border: error ? "1px solid #f87171" : "1px solid #10b981",
  outline: "none",
  boxSizing: "border-box"
});


  const textarea = (error) => ({
    ...input(error),
    minHeight: "80px",
    resize: "none"
  });

  const errorText = {
    fontSize: "12px",
    color: "#dc2626",
    marginTop: "4px"
  };

  const footer = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "18px"
  };

  const btn = (bg, color = "#fff") => ({
    padding: "10px 22px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: bg,
    color,
    fontSize: "14px"
  });

  return (
    <form
      style={card}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div style={title}>Add New Book</div>

      {/* Book Name */}
      <div style={field}>
        <label style={label}>Book Name</label>
        <input
          style={input(errors.title)}
          placeholder="Book Name"
          {...register("title", { required: "Book name is required" })}
        />
        {errors.title && <div style={errorText}>{errors.title.message}</div>}
      </div>

      {/* Author */}
      <div style={field}>
        <label style={label}>Author</label>
        <input
          style={input(errors.author)}
          placeholder="Author"
          {...register("author", { required: "Author is required" })}
        />
        {errors.author && <div style={errorText}>{errors.author.message}</div>}
      </div>

      {/* Publisher */}
      <div style={field}>
        <label style={label}>Publisher</label>
        <input
          style={input(errors.publisher)}
          placeholder="Publisher"
          {...register("publisher", { required: "Publisher is required" })}
        />
        {errors.publisher && (
          <div style={errorText}>{errors.publisher.message}</div>
        )}
      </div>

      {/* Published Date (Calendar) */}
<div style={field}>
  <label style={label}>Published Date</label>

  <input
    type="date"
    style={input(errors.publishedDate)}
    {...register("publishedDate", {
      required: "Published date is required",
      validate: (value) => {
        const date = new Date(value);
        const year = date.getFullYear();
        const currentYear = new Date().getFullYear();

        if (isNaN(date.getTime())) {
          return "Invalid date";
        }

        if (year < 1000 || year > currentYear) {
          return "Year must be between 1000 and current year";
        }

        return true;
      }
    })}
  />

  {errors.publishedDate && (
    <div style={errorText}>{errors.publishedDate.message}</div>
  )}
</div>
      {/* Description */}
      <div style={field}>
        <label style={label}>Description</label>
        <textarea
          style={textarea(errors.description)}
          placeholder="Description"
          {...register("description", {
            minLength: {
              value: 10,
              message: "Minimum 10 characters"
            }
          })}
        />
        <div style={{ fontSize: "11px", textAlign: "right" }}>
          {descLength} characters
        </div>
        {errors.description && (
          <div style={errorText}>{errors.description.message}</div>
        )}
      </div>

      {/* Footer */}
      <div style={footer}>
        <button type="submit" style={btn("#1e3a8a")}>
          Save
        </button>

        <button
          type="button"
          style={btn("#e5e7eb", "#111827")}
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookForm;
