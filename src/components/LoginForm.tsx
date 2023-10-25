import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/auth/authOperation";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const LoginForm = () => {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  const onSubmit = (e: { preventDefault: () => void }) => {
    dispatch(logIn(values));
    e.preventDefault();
    setValues({ email: "", password: "" });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        ></input>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        ></input>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
