import  { useState } from "react";
import axios from "axios";

export default function PasswordForm() {
  
  // start - shezi
  const apiKey =  process.env.REACT_APP_API_KEY;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(email || password)) {
      alert("Please provide either email and password.");
      return;
    }
    try {
      const response = await axios.post(
        `${apiKey}/authentication/login`,
        {
          email: email,
          password: password,
        }
      );
      console.log("API RESPONSE", JSON.stringify(response.data));
      alert(JSON.stringify(response.data.message));
      if (response.data.status) {
        const accessToken =
          response.headers["grpc-metadata-admin-access-token"];
        const refreshToken =
          response.headers["grpc-metadata-admin-refresh-token"];
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        window.location.href = "/admin";
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred during authentication. Please try again.");
      window.location.href = "/admin";
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      {/* end - shezi */}

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
