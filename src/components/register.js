import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation REGISTER_USER($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      token
    }
  }
`;

function Register() {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted({ registerUser }) {
      localStorage.setItem("token", registerUser);
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    registerUser({ variables: { email, password } });
    try {
      // const { token } = loginData;
      // await localStorage.setItem("jwtToken", token);
      // setAuthToken(token);
      // const decoded = jwt_decode(token);
      // setAuth({
      //   isAuthenticated: !isEmpty(decoded),
      //   user: decoded,
      // });
      // setErrors({});
      // setEmail("");
      // setPassword("");
      // history.push("/");
    } catch (e) {
      setErrors(e.response.data);
    }
  };

  return (
    <div>
      <h3>Register: </h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errors.email && <span className="red">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errors.password && <span className="red">{errors.password}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default Register;
