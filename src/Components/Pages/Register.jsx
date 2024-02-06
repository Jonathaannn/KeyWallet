import Style from "./Style/FormLogin.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

const schemaRegister = z.object({
  name: z.string().min(1, { message: "Este campo é obrigatório!" }),
  email: z
    .string()
    .email({ message: "Formato de email inválido" })
    .min(1, { message: "Este campo é obrigatório!" }),
  password: z.string().min(1, { message: "Este campo é obrigatório!" }),
  confirmPassword: z.string().min(1, { message: "Este campo é obrigatório!" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspodem!",
    path: ["confirmPassword"]
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaRegister) });

  const navigate = useNavigate()

  const handleLogin = async (data) => {
    const { name, email, password, confirmPassword } = data;
    const response = await fetch(process.env.REACT_APP_BASE_URL+"/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password, confirmPassword})
    })
    if (!response.ok) {
      return window.alert("Falha ao salvar o usuário!")
    }
    navigate("/login")
  };

  return (
    <div className={`${Style.container}`}>
      <div className={`${Style.form}`}>
        <h3>Register</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
        <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name")}
            />
            {errors.name && <p>{errors.name?.message}</p>}
          </div>
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
          <div>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}
          </div>
          <button type="submit" className={Style.button}>Resgistrar</button>
        </form>
        <p className={`${Style.link}`}>
          Já tem uma conta? <Link to="/login">Logar-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
