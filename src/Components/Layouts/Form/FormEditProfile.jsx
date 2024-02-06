import Style from "./style.module.css";
import { useAuth } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Este campo é obrigatório!" }),
  password: z.string(),
  confPassword: z.string().min(1, { message: "Esta campo é obrigatório!" }),
  email: z
    .string()
    .email({ message: "Preencha este campo com um formato de email válido!" })
    .min(1, { message: "Este campo é obrigatório!" }),
});

const FormEditProfile = ({ name, email }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    const inputName = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    inputName.value = name;
    inputEmail.value = email;
    setValue("name", name);
    setValue("email", email);
  }, [name, email, setValue]);

  const { token } = useAuth();
  const handleUpdateAccount = async (dataForm) => {
    const { name, email, password, confPassword } = dataForm;
    const data = {
      newEmail: email,
      newName: name,
      newPassword: password,
      password: confPassword,
    };
    const response = await fetch(process.env.REACT_APP_BASE_URL+"/api/user/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      alert("Algo deu errado ao atualizar os dados!");
      return window.location.reload();
    }
    alert("Dados atualizado com sucesso!");
    return window.location.replace("/profile/me");
  };

  return (
    <div className={Style.container}>
      <form
        onSubmit={handleSubmit(handleUpdateAccount)}
        className={Style.form}
      >
        <div className={Style.titleForm}>
          <span>{name}</span>
        </div>
        <div className={Style.input}>
          <input
            type="text"
            placeholder={name}
            id="name"
            {...register("name")}
          />
          {errors.name && <p>{errors.name?.message}</p>}
        </div>
        <div className={Style.input}>
          <input
            type="text"
            placeholder={email}
            id="email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </div>
        <div className={Style.input}>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            {...register("password")}
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </div>
        <div className={Style.input}>
          <input
            type="password"
            placeholder="Digite sua antiga senha"
            {...register("confPassword")}
          />
          {errors.confPassword && <p>{errors.confPassword?.message}</p>}
        </div>
        <div className={Style.buttons}>
          <button
            className={`${Style.button} ${Style.danger}`}
            onClick={() => window.location.replace("/profile/me")}
          >
            Cancel
          </button>
          <button
            className={`${Style.button} ${Style.success}`}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditProfile;
