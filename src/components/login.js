import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

function Login() {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser }) {
      localStorage.setItem("token", loginUser.token);
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    loginUser({ variables: { email, password } });

    // try {
    //   const response = await axios.post("/api/users/login", userData);
    //   const data = await response.data;

    //   const { token } = data;
    //   await localStorage.setItem("jwtToken", token);
    //   setAuthToken(token);
    //   const decoded = jwt_decode(token);

    //   setAuth({
    //     isAuthenticated: !isEmpty(decoded),
    //     user: decoded,
    //   });
    //   setErrors({});
    //   setEmail("");
    //   setPassword("");
    //   history.push("/");
    // } catch (e) {
    //   setErrors(e.response.data);
    // }
  };

  return (
    <div>
      <h3>Login:</h3>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
