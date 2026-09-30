import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllCoursesApi } from "../../../services/courseServices";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await GetAllCoursesApi();

        setCourses(response?.courses || []);
      } catch (error) {
        console.error(error);
      }
    };

    getCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>

      {courses.map((course) => (
        <div key={course._id}>
          <h3>{course.name}</h3>

          <Link to={`/course/create-course/${course._id}`}>
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseList;