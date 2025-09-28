import React from "react";
import Admin from './Admin'
import Student from './Student'


const Home = (props) => {
 
  return (
    <div>
      { props.student.role === 'admin' ? <Admin student={props.student} /> : <Student student={props.student} /> }
    </div>
  );
};

export default Home;
