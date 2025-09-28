import axios from "axios";
const API_BASE_URL = "https://e-library-backend-eiuajc1qh-alamgir-khan-aks-projects.vercel.app/api/users";

const StudentLogIn = async(data, navigate) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        name: data.name,
        password: data.password
      });
  
      console.log("Login success:", res.data);
      localStorage.setItem("student", JSON.stringify(res.data.user));
      alert("Login successful!");
      navigate('/'); 
      window.location.reload();
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed");
    } 
  };

  const AddStudent = async (data) => {
    try {
      const res = await axios.post( `${API_BASE_URL}` , data);
      console.log("Saved:", res.data);
      alert("Student saved successfully!");
      setData({ name: "", password: "", department: "", semester: "" });
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };

  const GetStudent = async (name) => {
    try {
      const res = await axios.get(`${API_BASE_URL , name}`);
      console.log("User data fetched:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
      return null;
    }
  };

  const GetDepartment = async (setDepartment) => {
      try {
        const response = await axios.get("https://e-library-backend-eiuajc1qh-alamgir-khan-aks-projects.vercel.app/api/departments");
        setDepartment(response.data);
        localStorage.setItem('departnments', JSON.stringify(response.data));
      } catch (err) {
        setError("Failed to fetch student data. Please try again later.");
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
  }

export { StudentLogIn , AddStudent , GetStudent , GetDepartment };