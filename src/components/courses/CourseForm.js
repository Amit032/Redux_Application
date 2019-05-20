import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import Pagination from "../Pagination";

const CourseForm = ({
  course,
  authors,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <div>
      <form onSubmit={onSave}>
        <h2>{course.id ? "Edit" : "Add"} Course</h2>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <TextInput
          id="title"
          name="title"
          label="Title"
          value={course.title}
          onChange={onChange}
          error={errors.title}
        />

        <SelectInput
          name="authorId"
          label="Author"
          value={course.authorId || ""}
          defaultOption="Select Author"
          options={authors.map(author => ({
            value: author.id,
            text: author.name
          }))}
          onChange={onChange}
          error={errors.author}
        />

        <TextInput
          id="category"
          name="category"
          label="Category"
          value={course.category}
          onChange={onChange}
          error={errors.category}
        />

        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
      <Pagination
        items={this.state.exampleItems}
        onChangePage={this.onChangePage}
      />
    </div>
  );
};

window.onbeforeunload = function() {
  let unsavedTitle = document.getElementById("title").value;
  var unsavedCateg = document.getElementById("category").value;
  if (unsavedTitle.length !== 0 && unsavedCateg.length !== 0) {
    return "You haven't saved your changes";
  }
};

CourseForm.propTypes = {
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default CourseForm;
