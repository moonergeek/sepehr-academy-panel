import React, {useEffect, useState} from 'react';
import "../../searchBox/serachbox.css"
import "./createNewCourse.css"
import {useFormik} from "formik";
import {toast, ToastContainer} from "react-toastify";
import cloud from "../../../assets/images/cloud-computing.png"
import PostImage from "../../../core/services/api/uploadImg/postImage.api";
import CreateCourse from "../../../core/services/api/courses/createCourse.api";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";

const CreateNewCourse = () => {
  const [selectedFile, setSelectedFile] = useState()
  const [open, setOpen] = useState(false)
  const [imageAddress, setImageAddress] = useState("")
  const [courseGetData, setCourseGetData] = useState(null)
  const [preview, setPreview] = useState()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }
  const initialValues = {
    courseName: "",
    topics: [],
    description: "",
    image: imageAddress,
  };

  const handleClick = async () => {
    try {
      const result = await PostImage();
      console.log(result.data.result)
      setImageAddress(result.data.result)
      console.log(imageAddress)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSnackBar = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const onSubmit = async (values) => {
    const coursePostData = {
      courseName: values.courseName,
      topics:  [values.topics],
      description: values.description,
      image: imageAddress,
    };
    const result = await CreateCourse(coursePostData);
    console.log(coursePostData)
    console.log(result);
    setCourseGetData(result.data.message[0].message)
    // toast.success(result.data.message[0].message);
  }

  const validate = (values) => {
    let errors = {};

    if (!values.courseName) {
      errors.courseName = "عنوان دوره را وارد کنید";
    }

    if (!values.topics) {
      errors.topics = " موضوع دوره را وارد کنید ";
    }

    if (!values.description) {
      errors.description = "توضیحات دوره را وارد کنید";
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
            autoClose={2000}
            rtl={true}
          />
          <form onSubmit={formik.handleSubmit}>
            <div className={"row mb-5 mt-3"}>
               <span className="panel-title">
                  {"ساخت یک دوره جدید"}
              </span>
            </div>
            <div className="row mb-4 pt-4">
              <div className="col pt-2">
                <input className="form-control me-2 Search-box" type="text"
                       placeholder={"عنوان دوره"}
                       aria-label="courseName"
                       id={"courseName"}
                       name="courseName"
                       onChange={formik.handleChange}
                       value={formik.values.courseName}
                       onBlur={formik.handleBlur}
                       autoComplete="off"
                />
                <div className="text-danger mt-1 pe-2">
                  {formik.touched.courseName && formik.errors.courseName ? (
                    <div>{formik.errors.courseName}</div>
                  ) : null}
                </div>
              </div>
              <div className="col pt-2">
                <input className="form-control me-2 Search-box" type="text"
                       placeholder={"موضوع دوره"}
                       aria-label="courseTopics"
                       id={"courseTopics"}
                       name="topics"
                       onChange={formik.handleChange}
                       value={formik.values.topics}
                       onBlur={formik.handleBlur}
                       autoComplete="off"
                />
                <div className="text-danger mt-1 pe-2">
                  {formik.touched.topics && formik.errors.topics ? (
                    <div>{formik.errors.topics}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"/>
                <textarea className="form-control text-aria" id="exampleFormControlTextarea1" rows="3"
                          placeholder={"توضیحات دوره"}
                          aria-label="courseDescription"
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                />
                <div className="text-danger mt-1 pe-2">
                  {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                  ) : null}
                </div>
              </div>

            </div>
            <div className={"row"}>
              <div className={"col-sm-9"}>
                <div className="mb-3">
                  <button className={"btn btn-upload"}>
                    <span className={"upload-avatar-text"}>آپلود تصویر</span>
                    <img className={"upload-icon"} src={cloud} alt="cloud"/>
                    <input className="form-control visibility-none" onChange={onSelectFile} type="file" id="formFile"
                           aria-label="upload"
                    />
                  </button>
                  <button onClick={handleClick} type={"button"}
                          className={"upload-text-2 btn btn-primary text-light"}> بارگذاری کنید
                  </button>
                </div>
                <div className={"me-3 mb-4"}>
                  {selectedFile && <img className={"uploaded-img"} width={200} src={preview} alt={""}/>}
                </div>
              </div>
            </div>
            <div className={"row mt-4 mb-3 me-2"}>
              <div className={"d-flex justify-content-center"}>
                <div>
                  <button onClick={handleSnackBar} className={" btn-green btn btn-hover"} type={"submit"}>ثبت</button>
                  {courseGetData && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      {courseGetData}
                    </Alert>
                  </Snackbar>}
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

export default CreateNewCourse;
