import React, { useState, useCallback } from "react";
import { auth } from "../../firebase";
import { withRouter } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaLoginAdmin } from "./../../Utils/schema";
const Login = (props) => {
  const [email, setEmail] = useState("admin@demo.com");
  const [pass, setPass] = useState("123456");

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schemaLoginAdmin),
  });

  const ingresar = useCallback(async () => {
    try {
      await auth.signInWithEmailAndPassword(email, pass);

      props.history.push("/admin/productos");
    } catch (error) {
      console.log(error);
    }
  }, [email, pass, props.history]);

  return (
    <div className="mt-5">
      <h3 className="text-center text-white">Ingresar</h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={handleSubmit(ingresar)}>
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Ingrese Email"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
              ref={register}
            />
            {errors.email && (
              <div className="alert alert-danger">{errors.email?.message}</div>
            )}
            <input
              type="password"
              name="password"
              className="form-control mb-2"
              placeholder="Ingrese Contraseña"
              onChange={(e) => setPass(e.target.value)}
              defaultValue={pass}
              ref={register}
            />
            {errors.password && (
              <div className="alert alert-danger">
                {errors.password?.message}
              </div>
            )}
            <button className="btn btn-lg btn-dark btn-block" type="submit">
              Acceder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
