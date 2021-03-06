import React, {useEffect, useState} from 'react';
import "./createNewTerm.css"
import "../../searchBox/serachbox.css"
import PanelTitle from "../../panel-title/panelTitle";
import {useFormik} from "formik";
import {toast, ToastContainer} from "react-toastify";
import CreateTerm from "../../../core/services/api/terms/createTerm.api";
import {useHistory} from "react-router-dom";
import GetAllCourses from "../../../core/services/api/courses/getAllCourses.api";
import GetAllTeachers from "../../../core/services/api/GetAllTeachers.api";

const CreateNewTerm = () => {

  const [allCoursesInfo, setAllCoursesInfo] = useState([]);
  const [allTeachersInfo, setAllTeachersInfo] = useState([]);

  const getCourses = async () => {
    const result = await GetAllCourses();
    setAllCoursesInfo(result);
  };
  const getTeachers = async () => {
    const result = await GetAllTeachers();
    setAllTeachersInfo(result);
  };
  useEffect(() => {
    getCourses();
    getTeachers();
  }, []);

  const history = useHistory()

  const initialValues = {
    title: "",
    cost: "",
    endDate: "",
    startDate: "",
    capacity: "",
    teacher: "",
    course: "",
  };

  const onSubmit = async (values) => {
    const termPostData = {
      title: values.title,
      cost: Number(values.cost),
      endDate: values.endDate,
      startDate: values.startDate,
      capacity: Number(values.capacity),
      teacher: values.teacher,
      course: values.course,
    };
    console.log(termPostData)
    const result = await CreateTerm(termPostData);
    toast.success(result.data.message[0].message);
    setTimeout(() => {
      result && history.push("/all-terms")
    }, 2500)

  }


  const validate = (values) => {
    let errors = {};

    if (!values.title) {
      errors.title = "عنوان ترم را وارد کنید";
    }

    if (!values.cost) {
      errors.cost = "قیمت ترم را وارد کنید";
    }

    if (!values.endDate) {
      errors.endDate = "تاریخ پایان را وارد کنید";
    }

    if (!values.startDate) {
      errors.startDate = "تاریخ شروع را وارد کنید";
    }

    if (!values.capacity) {
      errors.capacity = "ظرفیت ترم را وارد کنید";
    }

    if (!values.teacher) {
      errors.teacher = "استاد ترم را وارد کنید";
    }
    if (!values.course) {
      errors.course = "دوره را وارد کنید";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });


  return (
    <>
      <div className={"white-background"}>
        <div className={"container"}>
          <ToastContainer
            position="top-center"
            limit={1}
            autoClose={3000}
            rtl={true}
          />
          <form onSubmit={formik.handleSubmit}>
            <div className={"row mb-5 mt-3"}><PanelTitle Title={" ساخت یک ترم جدید"}/></div>
            <div className="row mb-4 pt-4">
              <div className="col pt-2">
                <input className="form-control me-2 Search-box" type="text"
                       placeholder={"عنوان ترم"}
                       aria-label="title-term"
                       id={"title-term"}
                       name="title"
                       onChange={formik.handleChange}
                       value={formik.values.title}
                       onBlur={formik.handleBlur}
                       autoComplete="off"
                />
                <div className="text-danger mt-1 pe-2">
                  {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                  ) : null}
                </div>
              </div>
              <div className="col pt-2">
                <input className="form-control me-2 Search-box" type="text"
                       placeholder={"قیمت ترم"}
                       aria-label="cost"
                       id={"cost-term"}
                       name="cost"
                       onChange={formik.handleChange}
                       value={formik.values.cost}
                       onBlur={formik.handleBlur}
                       autoComplete="off"
                />
                <div className="text-danger mt-1 pe-2">
                  {formik.touched.cost && formik.errors.cost ? (
                    <div>{formik.errors.cost}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col pt-2">
                <input className="form-control me-2 Search-box" type="text"
                       placeholder={"تاریخ پایان ترم"}
                       aria-label="endDate"
                       id={"endDate-term"}
                       name="endDate"
                       onChange={formik.handleChange}
                       value={formik.values.endDate}
                       onBlur={formik.handleBlur}
                       autoComplete="off"
                />
                <div className="text-danger mt-1 pe-2">
                  {formik.touched.endDate && formik.errors.endDate ? (
                    <div>{formik.errors.endDate}</div>
                  ) : null}
                </div>
              </div>
              <div className="col pt-2">
                <input className="form-control me-2 Search-box" type="text"
                       placeholder={"تاریخ شروع ترم"}
                       aria-label="startDate"
                       id={"startDate-term"}
                       name="startDate"
                       onChange={formik.handleChange}
                       value={formik.values.startDate}
                       onBlur={formik.handleBlur}
                       autoComplete="off"
                />
                <div className="text-danger mt-1 pe-2">
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <div>{formik.errors.startDate}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6 pt-2">
                <input className="form-control me-2 Search-box" type="text"
                       placeholder={"ظرفیت دوره"}
                       aria-label="capacity"
                       id={"capacity-term"}
                       name="capacity"
                       onChange={formik.handleChange}
                       value={formik.values.capacity}
                       onBlur={formik.handleBlur}
                       autoComplete="off"
                />
                <div className="text-danger mt-1 pe-2">
                  {formik.touched.capacity && formik.errors.capacity ? (
                    <div>{formik.errors.capacity}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-4 pt-2 me-2">
                <select id={"teacher-term"}
                        name="teacher"
                        value={formik.values.teacher}
                        onChange={formik.handleChange}
                        className="form-select" aria-label="Teacher select">
                  <option defaultValue={''}>انتخاب استاد ترم</option>
                  {Object.entries(allTeachersInfo).map(item => <option key={item[1]._id} value={item[1]._id}>
                    {item[1].fullName}
                  </option>)}
                </select>
              </div>
            </div>
            <div className={"row me-1"}>
              <div className={"col-4"}>
                <select id={"course-term"}
                        name="course"
                        value={formik.values.course}
                        onChange={formik.handleChange}
                        className="form-select select-course" aria-label="Course select">
                  <option defaultValue={''}>انتخاب دوره مرتبط</option>
                  {Object.entries(allCoursesInfo).map(item => <option key={item[1]._id} value={item[1]._id}>
                    {item[1].courseName}
                  </option>)}
                </select>
              </div>
            </div>
            <div className={"row mt-3 mb-3 me-2"}>
              <div className={"d-flex justify-content-center"}>
                <div>
                  <button className={" btn-green btn btn-hover"} type={"submit"}>ثبت</button>
                </div>
                <button className={" btn-blue btn me-2 mb-3 btn-hover"}> ریست</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default CreateNewTerm;
