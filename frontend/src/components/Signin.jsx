import axios from "axios";
function Signin() {
  function signin() {
    axios
      .post("http://localhost:7000/signin", {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      })
      .then((response) => {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          window.location = "/dashboard";
        } else {
          alert(response.data.message || "Signin failed");
        }
      });
  }
  return (
    <div style={{alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column",gap: "40px",paddingLeft:"650px"}}>
      <input placeholder="Enter your username" id="username"></input>
      <input placeholder="Enter your password" id="password"></input>
      <button onClick={signin}>Signin</button>
    </div>
  );
}
export default Signin;
