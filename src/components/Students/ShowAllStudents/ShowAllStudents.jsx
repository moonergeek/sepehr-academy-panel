import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GetAllStudents from '../../../core/services/api/GetAllStudents'
import './showAllCourses.css'

const ShowAllStudents = () => {
  const [allStudentsData, setAllStudentsData] = useState([])

  const getStudents = async () => {
    const result = await GetAllStudents()
    setAllStudentsData(result)
  }
  useEffect(() => {
    getStudents()
  }, [])
  return (
    <>
      <>
        <div className="course-body mt-4">
          <div className={'mainDiv container mt-4 mb-5'}>
            <h4>{'همه دانش آموزان'} </h4>
          </div>
          <table className="table panel-table table-borderless ">
            <thead className={'thead-color'}>
              <tr className={'tr-color'}>
                <th scope="col">نام دانش آموز</th>
                <th scope="col">ایمیل</th>
                <th scope="col">شماره موبایل</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allStudentsData.map((student) => (
                <tr key={student._id} className={'green-hover'}>
                  <td scope="row" className={'course-td-items-topics'}>
                    {student.fullName}
                  </td>
                  <td scope="row" className={'course-td-items'}>
                    {student.email}
                  </td>
                  <td scope="row" className={'course-th-items'}>
                    {student.phoneNumber}
                  </td>

                  <td scope="row" className={'course-th-items'}>
                    <button className="btn btn-outline-danger btn-sm">حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </>
  )
}

export default ShowAllStudents
