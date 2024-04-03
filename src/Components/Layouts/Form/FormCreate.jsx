import Style from "./style.module.css";
import { FiSettings } from "react-icons/fi";
import { useAuth } from "../../../Context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Este campo é obrigatório!" }),
  site: z
    .string()
    .url({ message: "É necesessário ser uma url web" })
    .min(1, { message: "Este campo é obrigatório!" }),
  username: z.string().min(1, { message: "Este campo é obrigatório!" }),
  password: z.string(),
});

const FormCreate = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [generatePass, setGeneratePass] = useState("");
  const handleGeneratePass = () => {
    const pass = Math.random().toString(36).slice(-11);
    setGeneratePass(pass);
    setValue("password", pass);
  };

  const { token } = useAuth();
  const handleSaveAccount = async (data) => {
    const { name, site, username, password } = data;
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/api/account/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, site, username, password }),
      }
    );
    if (!response.ok) {
      alert("Erro ao salvar a nova chave!");
    }
    window.location.replace("/home");
  };

  return (
    <div className={Style.container}>
      <form
        onSubmit={handleSubmit(handleSaveAccount)}
        className={Style.form}
      >
        <div className={Style.input}>
          <input
            type="text"
            placeholder="Título"
            {...register("name")}
          />
          {errors.name && <p>{errors.name?.message}</p>}
        </div>
        <div className={Style.input}>
          <input
            type="text"
            placeholder="Email or Username"
            {...register("username")}
          />
          {errors.username && <p>{errors.username?.message}</p>}
        </div>
        <div className={Style.input}>
          <input
            type="text"
            id="password"
            required
            placeholder="Password"
            onChange={(e) => {
              setGeneratePass(e.target.value);
              setValue("password", generatePass);
            }}
            {...register("password")}
          />
          {errors.password && <p>{errors.password?.message}</p>}
          <span onClick={handleGeneratePass}>
            <FiSettings size={24} />
            Generate password
          </span>
        </div>
        <div className={Style.input}>
          <input
            type="text"
            placeholder="Website Address"
            {...register("site")}
          />
          {errors.site && <p>{errors.site?.message}</p>}
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

export default FormCreate;
