import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/fetchUser";

const CourseDetails = () => {
  const { id } = useParams();
  const { getSingleCourse } = useAuth();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getSingleCourse(id);

        console.log("COURSE:", response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <section>
      <h1>Course Details</h1>
    </section>
  );
};

export default CourseDetails;