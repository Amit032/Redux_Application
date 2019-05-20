import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseList = ({ courses, onDeleteClick, filterValue }) => {
  var counter = 0;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>No. Of Course</th>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {courses
          .sort((a, b) => a.title.localeCompare(b.title))
          .filter(value =>
            value.title.toLowerCase().match(filterValue.toLowerCase())
          )
          .map(course => {
            return (
              <tr key={course.id}>
                <td>{(counter = counter + 1)}</td>
                <td>
                  <a
                    className="btn btn-light"
                    href={"http://pluralsight.com/courses/" + course.slug}
                  >
                    Watch
                  </a>
                </td>
                <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDeleteClick(course)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  filterValue: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseList;
