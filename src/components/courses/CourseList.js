import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const CourseList = ({ courses, onDeleteClick, filterValue }) => {
  const [pageOfItems, setPageOfItems] = useState([]);
  const [shortedCourse, setShortedCourse] = useState({ courses });
  console.log(shortedCourse);
  console.log();

  const onChangePage = pageOfItem => {
    setPageOfItems(pageOfItem);
  };

  const handleShort = value => {
    var shortedCourse = courses.sort((a, b) =>
      a[value].localeCompare(b[value], undefined, {
        numeric: true,
        sensitivity: "base"
      })
    );
    setShortedCourse(shortedCourse);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleShort("id")}>No. Of Course</th>
            <th />
            <th onClick={() => handleShort("title")}>Title</th>
            <th onClick={() => handleShort("authorName")}>Author</th>
            <th onClick={() => handleShort("category")}>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {pageOfItems
            .filter(value =>
              value.title.toLowerCase().match(filterValue.toLowerCase())
            )
            .map(course => {
              return (
                <tr key={course.id}>
                  <td>{course.id}</td>
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
      <div>
        <Pagination items={shortedCourse} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

CourseList.propTypes = {
  filterValue: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseList;
