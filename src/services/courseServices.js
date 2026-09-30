import api from "./api/axios";
export const CreateCourseApi = async (payload) => {
    const { data } = await api.post("/course/create-course", payload);

    return data;
};


export const GetSingleCourseApi = async (id) => {
    const { data } = await api.get(`/course/get-course/${id}`);
    return data;
};

export const UpdateCourseApi = async (id, payload) => {
    const { data } = await api.put(`/course/update-course/${id}`, payload);
    return data;
};