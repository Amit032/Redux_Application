import * as types from "../actions/ActionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      console.log(action);
      return [...state, { ...action.courses }];
    case types.UPDATE_COURSE_SUCCESS:
      console.log(action);
      return state.map(course =>
        course.id === action.courses.id ? action.courses : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.course.id);
    default:
      return state;
  }
}