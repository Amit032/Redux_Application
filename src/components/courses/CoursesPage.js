import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as courseActions from "../../redux/actions/CourseAction";
import * as authorActions from "../../redux/actions/authorActions";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
    filterValue: ""
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        console.log("Loading Courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        console.log("Loading Authors failed" + error);
      });
    }
  }
  // state = {
  //   course: {
  //     title: ""
  //   }
  // };

  // handleChange = event => {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course: course });
  // };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   // this.props.dispatch(courseActions.CreateCourse(this.state.course)); This way is used when we are not using mapDispatchToProps function
  //   this.props.actions.CreateCourse(this.state.course);
  // };

  handleDeleteCourse = course => {
    try {
      this.props.actions.deleteCourse(course);
      toast.success("Course deleted");
    } catch (error) {
      toast.error("Delete failed." + error.message, { autoClose: false });
    }
  };

  handleOnChange = event => {
    this.setState({ filterValue: event.target.value });
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <div style={{ paddingBottom: "10px" }}>
              <input
                type="text"
                onChange={this.handleOnChange}
                className="form-control"
                placeholder="Enter Course Title to search..."
              />
            </div>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
              filterValue={this.state.filterValue}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.CreateCourse(course))
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
