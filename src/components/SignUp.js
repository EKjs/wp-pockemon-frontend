import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "react-loader-spinner";

const SignUp = () => {
  const location = useLocation();
  const { loading, isAuthenticated, error, signUp } = useContext(AuthContext);
  const defaultValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => await signUp(data);

  if (isAuthenticated)
    return (
      <Redirect
        to={{
          pathname: location.state ? location.state.next : "/",
          from: location.pathname,
        }}
      />
    );
  if (loading)
    return <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />;
  return (
    <div className="col-6 md-4">
      <div className="row">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </div>
          <div className="row">
          <input
              type="text"
              className="form-control mt-2"
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
            />
            {errors.name && (
              <div className="alert alert-danger" role="alert">
                {errors.name.message}
              </div>
            )}
            <input
              type="email"
              className="form-control mt-2"
              {...register("email", { required: "Email is required" })}
              placeholder="name@example.com"
            />
            {errors.email && (
              <div className="alert alert-danger" role="alert">
                {errors.email.message}
              </div>
            )}
            <input
              type="password"
              className="form-control mt-2"
              placeholder="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <div className="alert alert-danger" role="alert">
                {errors.password.message}
              </div>
            )}
              <input
              type="password"
              className="form-control mt-2"
              placeholder="Confirm your password"
              {...register("passwordConfirm", { required: "Confirming password is required" })}
            />
            {errors.passwordConfirm && (
              <div className="alert alert-danger" role="alert">
                {errors.passwordConfirm.message}
              </div>
            )}
          </div>
          <button className="btn btn-primary mt-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
