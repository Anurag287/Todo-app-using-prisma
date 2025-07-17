import axios from "axios";
function Signup() {
  function signup() {
    axios
      .post("http://localhost:7000/signup", {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      })
      .then(() => {
        window.location = "/signin";
      });
  }
  return (
    <div style={{alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column",gap: "40px",paddingLeft:"650px"}}>
      <input placeholder="Enter your username" id="username"></input>
      <input placeholder="Enter your password" id="password"></input>
      <button onClick={signup}>Signup</button>
    </div>
  );
}
export default Signup;
