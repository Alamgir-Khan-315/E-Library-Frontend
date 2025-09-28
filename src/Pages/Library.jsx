import React from 'react'
import Course_list from './Components/Course_list'

const Library = (props) => {
  return (
    <div className='min-h-[calc(100vh-12rem)] rounded-xl drop-shadow-xl bg-white'>
        <Course_list student={props.student}/>
    </div>
  )
}

export default Library