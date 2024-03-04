import Style from "./Style/FormLogin.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const schemaLogin = z.object({
  email: z
    .string()
    .email({ message: "Formato de email inválido" })
    .min(1, { message: "Este campo é obrigatório!" }),
  password: z.string().min(1, { message: "Este campo é obrigatório!" }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaLogin) });

  const { login } = useAuth();

  const handleLogin = async (data) => {
    const { email, password } = data;
    await login(email, password);
    window.location.replace("/home");
  };

  return (
    <div className={`${Style.container}`}>
      <h1>KeyWallet <span>Suas chaves mais seguras</span></h1>
      <div className={`${Style.form}`}>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              {...register("email")}
            />
            {errors.email && <p>{errors.email?.message}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
            />
            {errors.password && <p>{errors.password?.message}</p>}
          </div>
          <button type="submit" className={Style.button}>Entrar</button>
        </form>
        <p className={`${Style.link}`}>
          Ainda não tem uma conta? <Link to="/register">Registre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
