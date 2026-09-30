import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/fetchUser";

const CourseDetails = () => {
  const { id } = useParams();
  const { getSingleCourse } = useAuth();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getSingleCourse(id);

        setCourse(response?.course||null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <section>
      <h1>Course Details</h1>

      {course && (
        <div>
          <h2>{course.name}</h2>
          <p>{course.description}</p>
        </div>
      )}
    </section>
  );
};

export default CourseDetails;