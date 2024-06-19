import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Productcontext } from "../store/product_list_context"; // Adjust the path as needed

export default function Login() {
  const userid = useRef();
  const password = useRef();

  const { handlesubmit, message } = useContext(Productcontext);

  const handlesubmit2 = async (event) => {
    event.preventDefault();
    handlesubmit(event, userid.current.value, password.current.value);
  };

  return (
    <>
      <div className="form-signin">
        <form onSubmit={handlesubmit2}>
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={userid}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              ref={password}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-primary" type="submit">
            Sign in
          </button>
          <p className="back">{message}</p>
        </form>
      </div>
      <div className="signin-bottom">
        <hr />
        <p>New to Myntra?</p>
        <button className="btn btn-primary">
          <Link to="/signup" className="link-btn">
            Create your Myntra account
          </Link>
        </button>
      </div>
    </>
  );
}
