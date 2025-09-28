import Box_info from './Components/Box_info';
import Student_table from './Components/Student_table';
import Depart_table from './Components/Depart_table';
import Course_table from './Components/Course_table';


const Admin = () => {
 

  return (
    <div className="min-h-screen p-8 flex flex-col gap-5">

       <Box_info />
       <Student_table />
       <Depart_table />
       <Course_table />

    </div>
  );
};

export default Admin;
