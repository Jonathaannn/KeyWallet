import Style from "./style.module.css";
import { FiSettings } from "react-icons/fi";
import { useAuth } from "../../../Context/AuthContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, { message: "Este campo é obrigatório!" }),
  password: z.string(),
});

const FormEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const location = useLocation();
  const data = location.state.user;

  const [generatePass, setGeneratePass] = useState(data.password);
  const handleGeneratePass = () => {
    const pass = Math.random().toString(36).slice(-11);
    setGeneratePass(pass);
    setValue("password", pass);
  };

  const { token } = useAuth();
  const handleUpdateAccount = async (dataForm) => {
    const { username, password } = dataForm;
    const response = await fetch(process.env.REACT_APP_BASE_URL+`/api/account/update/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      alert("Erro ao atualizar a nova chave!");
    }
    window.location.replace("/home");
  };

  return (
    <div className={Style.container}>
      <form
        onSubmit={handleSubmit(handleUpdateAccount)}
        className={Style.form}
      >
        <div className={Style.titleForm}>
          <div>{data.name.substring(0, 2)}</div>
          <span>{data.name}</span>
        </div>
        <div className={Style.input}>
          <input
            type="text"
           placeholder={data.username}
            {...register("username")}
          />
          {errors.username && <p>{errors.username?.message}</p>}
        </div>
        <div className={Style.input}>
          <input
            type="text"
            id="password"
            required
            placeholder={data.password}
            value={generatePass}
            {...register("password")}
          />
          {errors.password && <p>{errors.password?.message}</p>}
          <span onClick={handleGeneratePass}>
            <FiSettings size={24} />
            Generate password
          </span>
        </div>
        <div className={Style.buttons}>
          <button
            className={`${Style.button} ${Style.danger}`}
            onClick={() => window.location.replace("/home")}
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

export default FormEdit;
