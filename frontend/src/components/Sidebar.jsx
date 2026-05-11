import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "200px",
      height: "100vh",
      background: "#1e293b",
      color: "white",
      padding: "20px"
    }}>

      <h2>MS Detection AI</h2>

      <nav style={{display:"flex", flexDirection:"column", gap:"15px", marginTop:"20px"}}>

        <Link to="/" style={{color:"white"}}>Dashboard</Link>

        <Link to="/patients" style={{color:"white"}}>Patients</Link>

        <Link to="/analysis" style={{color:"white"}}>Run Analysis</Link>

      </nav>

    </div>
  );
}

export default Sidebar;