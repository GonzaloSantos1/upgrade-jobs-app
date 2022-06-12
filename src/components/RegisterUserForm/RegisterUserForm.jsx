import { useForm } from "react-hook-form";
import { API } from "../../shared/services/api";
import { Link, useNavigate } from "react-router-dom";
const RegisterUserForm = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userToDB = {
      id: "",
      name: data.name,
      email: data.email,
      password: data.password,
      img: "https://res.cloudinary.com/dd3vgq4ks/image/upload/v1650619369/Assets-upgradejobs/user-gf5a686eee_1280_aowjo4.png",
      cv: "",
      candidatures: [],
    };
    API.post("/users/register", userToDB).then(navigate("/login"));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='register-form-container'>
      <input
        type='text'
        name='name'
        placeholder='🔤 Nombre'
        className='register-input'
        {...register("name", {
          required: {
            value: true,
            message: "Nombre obligatorio",
          },
          minLength: {
            value: 2,
            message: "El nombre tiene que tener al menos dos caracteres",
          },
        })}
      />
      {errors.name && <p className='error-message'>{errors.name.message}</p>}
      <input
        type='email'
        name='email'
        placeholder='📧 Email'
        className='register-input'
        {...register("email", {
          required: {
            value: true,
            message: "Inserta tu email",
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "El formato del email no es válido",
          },
        })}
      />
      {errors.email && <p className='error-message'>{errors.email.message}</p>}
      <input
        type='password'
        name='password'
        placeholder='🔐 Contraseña'
        className='register-input'
        {...register("password", {
          required: {
            value: true,
            message: "Inserta una contraseña",
          },
          minLength: {
            value: 8,
            message: "Mínimo 8 caracteres",
          },
          pattern: {
            value:
              /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            message:
              "Debe contener una mayúscula, una minúscula y un número/caracter especial",
          },
        })}
      />
      {errors.password && (
        <p className='error-message'>{errors.password.message}</p>
      )}
      <button className='signup-button'>Registrarse</button>
      <Link className='back-button' to='/login'>
        Volver
      </Link>
    </form>
  );
};

export default RegisterUserForm;
