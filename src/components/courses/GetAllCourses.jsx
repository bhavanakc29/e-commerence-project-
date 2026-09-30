import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllCoursesApi } from "../../services/courseServices";
import Styles from "./_getAllCourses.module.css";

const GetAllCourses = () => {
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
    <section className={Styles.courses}>
      <header className={Styles.courses_header}>
        <h1>All Courses</h1>
        <p>Explore our available courses</p>
      </header>

      <div className={Styles.courses_list}>
        {courses.map((course) => (
          <article className={Styles.course_card} key={course._id}>
            <div className={Styles.course_content}>
              <h2>{course.name}</h2>

              <p>{course.description}</p>

              <Link
                className={Styles.course_button}
                to={`/course/${course._id}`}
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default GetAllCourses;