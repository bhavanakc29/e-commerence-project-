import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/fetchUser";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Styles from "./_createCourse.module.css";

const CreateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    createCourse,
    getSingleCourse,
    updateCourse,
  } = useAuth();

  const isEditMode = Boolean(id);

  // ================= VALIDATION =================

  const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),

    description: Yup.string().required(
      "Course description is required"
    ),

    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be positive"),

    estimatedPrice: Yup.number()
      .typeError("Estimated price must be a number")
      .required("Estimated price is required")
      .positive("Estimated price must be positive"),

    tags: Yup.string().required("Tags are required"),

    level: Yup.string().required("Level is required"),

    demoUrl: Yup.string()
      .url("Enter a valid URL")
      .required("Demo URL is required"),

    // ================= BENEFITS =================

    benefits: Yup.array()
      .of(
        Yup.object({
          title: Yup.string().required(
            "Benefit is required"
          ),
        })
      )
      .min(1, "Add at least one benefit"),

    // ================= PREREQUISITES =================

    prerequisites: Yup.array()
      .of(
        Yup.object({
          title: Yup.string().required(
            "Prerequisite is required"
          ),
        })
      )
      .min(1, "Add at least one prerequisite"),

    // ================= COURSE DATA =================

    courseData: Yup.array()
      .of(
        Yup.object({
          title: Yup.string().required(
            "Course data title is required"
          ),

          description: Yup.string().required(
            "Course data description is required"
          ),

          videoUrl: Yup.string()
            .url("Enter a valid video URL")
            .required("Video URL is required"),

          videoSection: Yup.string().required(
            "Video section is required"
          ),

          videoLength: Yup.number()
            .typeError("Video length must be a number")
            .required("Video length is required")
            .positive(
              "Video length must be positive"
            ),
        })
      )
      .min(1, "Add at least one course data"),
  });

  // ================= FORMIK =================

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      estimatedPrice: "",
      tags: "",
      level: "",
      demoUrl: "",

      benefits: [
        {
          title: "",
        },
      ],

      prerequisites: [
        {
          title: "",
        },
      ],

      courseData: [
        {
          title: "",
          description: "",
          videoUrl: "",
          videoSection: "",
          videoLength: "",
        },
      ],
    },

    validationSchema,

    // ================= SUBMIT =================

    onSubmit: async (values) => {
      try {
        const payload = {
          name: values.name,
          description: values.description,

          price: Number(values.price),
          estimatedPrice: Number(
            values.estimatedPrice
          ),

          tags: values.tags,
          level: values.level,
          demoUrl: values.demoUrl,

          benefits: values.benefits,

          prerequisites: values.prerequisites,

          courseData: values.courseData.map(
            (data) => ({
              title: data.title,
              description: data.description,
              videoUrl: data.videoUrl,
              videoSection: data.videoSection,
              videoLength: Number(
                data.videoLength
              ),
            })
          ),
        };

        console.log("Course Payload:", payload);

        // ================= UPDATE =================

        if (isEditMode) {
          const response = await updateCourse(
            id,
            payload
          );

          console.log(
            "Update Course Response:",
            response
          );

          toast.success(
            "Course updated successfully"
          );

          navigate("/admin/admin-dashboard");

          return;
        }

        // ================= CREATE =================

        const response = await createCourse(payload);

        console.log(
          "Create Course Response:",
          response
        );

        toast.success(
          "Course created successfully"
        );

        formik.resetForm();

        navigate("/admin/admin-dashboard");
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            `Failed to ${
              isEditMode
                ? "update"
                : "create"
            } course`
        );
      }
    },
  });

  // ================= GET SINGLE COURSE =================

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const response =
          await getSingleCourse(id);

        console.log(
          "GET SINGLE COURSE:",
          response
        );

        const course = response?.course;

        if (!course) {
          toast.error("Course not found");
          return;
        }

        formik.setValues({
          name: course.name || "",

          description:
            course.description || "",

          price: course.price || "",

          estimatedPrice:
            course.estimatedPrice || "",

          tags: course.tags || "",

          level: course.level || "",

          demoUrl: course.demoUrl || "",

          benefits:
            course.benefits?.length > 0
              ? course.benefits
              : [
                  {
                    title: "",
                  },
                ],

          prerequisites:
            course.prerequisites?.length > 0
              ? course.prerequisites
              : [
                  {
                    title: "",
                  },
                ],

          courseData:
            course.courseData?.length > 0
              ? course.courseData
              : [
                  {
                    title: "",
                    description: "",
                    videoUrl: "",
                    videoSection: "",
                    videoLength: "",
                  },
                ],
        });
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to fetch course"
        );
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <section className={Styles.container}>
      <div className={Styles.form_box}>

        {/* ================= TITLE ================= */}

        <h1>
          {isEditMode
            ? "Update Course"
            : "Create Course"}
        </h1>

        <form onSubmit={formik.handleSubmit}>

          {/* ================= COURSE NAME ================= */}

          <div className={Styles.form_group}>
            <label htmlFor="name">
              Course Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter course name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.name &&
              formik.errors.name && (
                <span
                  className={Styles.error}
                >
                  {formik.errors.name}
                </span>
              )}
          </div>

          {/* ================= DESCRIPTION ================= */}

          <div className={Styles.form_group}>
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Enter course description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows="5"
            />

            {formik.touched.description &&
              formik.errors.description && (
                <span
                  className={Styles.error}
                >
                  {formik.errors.description}
                </span>
              )}
          </div>

          {/* ================= PRICE ================= */}

          <div className={Styles.form_group}>
            <label htmlFor="price">
              Price
            </label>

            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter course price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.price &&
              formik.errors.price && (
                <span
                  className={Styles.error}
                >
                  {formik.errors.price}
                </span>
              )}
          </div>

          {/* ================= ESTIMATED PRICE ================= */}

          <div className={Styles.form_group}>
            <label htmlFor="estimatedPrice">
              Estimated Price
            </label>

            <input
              type="number"
              id="estimatedPrice"
              name="estimatedPrice"
              placeholder="Enter estimated price"
              value={
                formik.values.estimatedPrice
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.estimatedPrice &&
              formik.errors.estimatedPrice && (
                <span
                  className={Styles.error}
                >
                  {
                    formik.errors
                      .estimatedPrice
                  }
                </span>
              )}
          </div>

          {/* ================= TAGS ================= */}

          <div className={Styles.form_group}>
            <label htmlFor="tags">
              Tags
            </label>

            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="React, JavaScript, Frontend"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.tags &&
              formik.errors.tags && (
                <span
                  className={Styles.error}
                >
                  {formik.errors.tags}
                </span>
              )}
          </div>

          {/* ================= LEVEL ================= */}

          <div className={Styles.form_group}>
            <label htmlFor="level">
              Level
            </label>

            <select
              id="level"
              name="level"
              value={formik.values.level}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">
                Select Level
              </option>

              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>
            </select>

            {formik.touched.level &&
              formik.errors.level && (
                <span
                  className={Styles.error}
                >
                  {formik.errors.level}
                </span>
              )}
          </div>

          {/* ================= DEMO URL ================= */}

          <div className={Styles.form_group}>
            <label htmlFor="demoUrl">
              Demo URL
            </label>

            <input
              type="url"
              id="demoUrl"
              name="demoUrl"
              placeholder="https://youtube.com/..."
              value={formik.values.demoUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.demoUrl &&
              formik.errors.demoUrl && (
                <span
                  className={Styles.error}
                >
                  {formik.errors.demoUrl}
                </span>
              )}
          </div>

          {/* ================================================= */}
          {/* ================= BENEFITS ====================== */}
          {/* ================================================= */}

          <div className={Styles.array_section}>

            <h2>Benefits</h2>

            {formik.values.benefits.map(
              (benefit, index) => (
                <div
                  className={Styles.array_row}
                  key={index}
                >

                  <input
                    type="text"
                    name={`benefits.${index}.title`}
                    placeholder="Enter benefit"
                    value={benefit.title}
                    onChange={
                      formik.handleChange
                    }
                    onBlur={
                      formik.handleBlur
                    }
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const updated =
                        [
                          ...formik.values
                            .benefits,
                        ];

                      updated.splice(
                        index,
                        1
                      );

                      formik.setFieldValue(
                        "benefits",
                        updated
                      );
                    }}
                  >
                    Remove
                  </button>

                </div>
              )
            )}

            <button
              type="button"
              onClick={() =>
                formik.setFieldValue(
                  "benefits",
                  [
                    ...formik.values
                      .benefits,
                    {
                      title: "",
                    },
                  ]
                )
              }
            >
              + Add Benefit
            </button>

            {typeof formik.errors
              .benefits === "string" && (
              <span
                className={Styles.error}
              >
                {formik.errors.benefits}
              </span>
            )}

          </div>

          {/* ================================================= */}
          {/* =============== PREREQUISITES ================== */}
          {/* ================================================= */}

          <div className={Styles.array_section}>

            <h2>Prerequisites</h2>

            {formik.values.prerequisites.map(
              (prerequisite, index) => (
                <div
                  className={Styles.array_row}
                  key={index}
                >

                  <input
                    type="text"
                    name={`prerequisites.${index}.title`}
                    placeholder="Enter prerequisite"
                    value={
                      prerequisite.title
                    }
                    onChange={
                      formik.handleChange
                    }
                    onBlur={
                      formik.handleBlur
                    }
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const updated =
                        [
                          ...formik.values
                            .prerequisites,
                        ];

                      updated.splice(
                        index,
                        1
                      );

                      formik.setFieldValue(
                        "prerequisites",
                        updated
                      );
                    }}
                  >
                    Remove
                  </button>

                </div>
              )
            )}

            <button
              type="button"
              onClick={() =>
                formik.setFieldValue(
                  "prerequisites",
                  [
                    ...formik.values
                      .prerequisites,
                    {
                      title: "",
                    },
                  ]
                )
              }
            >
              + Add Prerequisite
            </button>

            {typeof formik.errors
              .prerequisites === "string" && (
              <span
                className={Styles.error}
              >
                {formik.errors.prerequisites}
              </span>
            )}

          </div>

          {/* ================================================= */}
          {/* ================= COURSE DATA ================== */}
          {/* ================================================= */}

          <div className={Styles.array_section}>

            <h2>Course Data</h2>

            {formik.values.courseData.map(
              (data, index) => (
                <div
                  className={
                    Styles.course_data_box
                  }
                  key={index}
                >

                  <h3>
                    Course Data {index + 1}
                  </h3>

                  {/* Title */}

                  <div
                    className={
                      Styles.form_group
                    }
                  >
                    <label>
                      Title
                    </label>

                    <input
                      type="text"
                      name={`courseData.${index}.title`}
                      placeholder="Enter video title"
                      value={data.title}
                      onChange={
                        formik.handleChange
                      }
                      onBlur={
                        formik.handleBlur
                      }
                    />

                    {formik.touched
                      .courseData?.[index]
                      ?.title &&
                      formik.errors
                        .courseData?.[index]
                        ?.title && (
                        <span
                          className={
                            Styles.error
                          }
                        >
                          {
                            formik.errors
                              .courseData[
                              index
                            ].title
                          }
                        </span>
                      )}
                  </div>

                  {/* Description */}

                  <div
                    className={
                      Styles.form_group
                    }
                  >
                    <label>
                      Description
                    </label>

                    <textarea
                      name={`courseData.${index}.description`}
                      placeholder="Enter video description"
                      value={
                        data.description
                      }
                      onChange={
                        formik.handleChange
                      }
                      onBlur={
                        formik.handleBlur
                      }
                      rows="4"
                    />

                    {formik.touched
                      .courseData?.[index]
                      ?.description &&
                      formik.errors
                        .courseData?.[index]
                        ?.description && (
                        <span
                          className={
                            Styles.error
                          }
                        >
                          {
                            formik.errors
                              .courseData[
                              index
                            ].description
                          }
                        </span>
                      )}
                  </div>

                  {/* Video URL */}

                  <div
                    className={
                      Styles.form_group
                    }
                  >
                    <label>
                      Video URL
                    </label>

                    <input
                      type="url"
                      name={`courseData.${index}.videoUrl`}
                      placeholder="https://youtube.com/..."
                      value={
                        data.videoUrl
                      }
                      onChange={
                        formik.handleChange
                      }
                      onBlur={
                        formik.handleBlur
                      }
                    />

                    {formik.touched
                      .courseData?.[index]
                      ?.videoUrl &&
                      formik.errors
                        .courseData?.[index]
                        ?.videoUrl && (
                        <span
                          className={
                            Styles.error
                          }
                        >
                          {
                            formik.errors
                              .courseData[
                              index
                            ].videoUrl
                          }
                        </span>
                      )}
                  </div>

                  {/* Video Section */}

                  <div
                    className={
                      Styles.form_group
                    }
                  >
                    <label>
                      Video Section
                    </label>

                    <input
                      type="text"
                      name={`courseData.${index}.videoSection`}
                      placeholder="Introduction"
                      value={
                        data.videoSection
                      }
                      onChange={
                        formik.handleChange
                      }
                      onBlur={
                        formik.handleBlur
                      }
                    />

                    {formik.touched
                      .courseData?.[index]
                      ?.videoSection &&
                      formik.errors
                        .courseData?.[index]
                        ?.videoSection && (
                        <span
                          className={
                            Styles.error
                          }
                        >
                          {
                            formik.errors
                              .courseData[
                              index
                            ].videoSection
                          }
                        </span>
                      )}
                  </div>

                  {/* Video Length */}

                  <div
                    className={
                      Styles.form_group
                    }
                  >
                    <label>
                      Video Length
                    </label>

                    <input
                      type="number"
                      name={`courseData.${index}.videoLength`}
                      placeholder="Enter video length"
                      value={
                        data.videoLength
                      }
                      onChange={
                        formik.handleChange
                      }
                      onBlur={
                        formik.handleBlur
                      }
                    />

                    {formik.touched
                      .courseData?.[index]
                      ?.videoLength &&
                      formik.errors
                        .courseData?.[index]
                        ?.videoLength && (
                        <span
                          className={
                            Styles.error
                          }
                        >
                          {
                            formik.errors
                              .courseData[
                              index
                            ].videoLength
                          }
                        </span>
                      )}
                  </div>

                  {/* Remove */}

                  <button
                    type="button"
                    onClick={() => {
                      const updated =
                        [
                          ...formik.values
                            .courseData,
                        ];

                      updated.splice(
                        index,
                        1
                      );

                      formik.setFieldValue(
                        "courseData",
                        updated
                      );
                    }}
                  >
                    Remove Course Data
                  </button>

                </div>
              )
            )}

            {/* Add Course Data */}

            <button
              type="button"
              onClick={() =>
                formik.setFieldValue(
                  "courseData",
                  [
                    ...formik.values
                      .courseData,

                    {
                      title: "",
                      description: "",
                      videoUrl: "",
                      videoSection: "",
                      videoLength: "",
                    },
                  ]
                )
              }
            >
              + Add Course Data
            </button>

            {typeof formik.errors
              .courseData === "string" && (
              <span
                className={Styles.error}
              >
                {formik.errors.courseData}
              </span>
            )}

          </div>

          {/* ================= SUBMIT ================= */}

          <button
            type="submit"
            className={Styles.submit_btn}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Course"
              : "Create Course"}
          </button>

        </form>
      </div>
    </section>
  );
};

export default CreateCourse;