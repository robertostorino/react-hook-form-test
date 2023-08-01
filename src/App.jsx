import {useForm} from 'react-hook-form';

const App = () => {
  
  const { register, 
          handleSubmit, 
          formState: {errors},
          watch,
          setValue,
          reset 
  } = useForm();

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    alert('enviando datos ... ');

    reset()
  });

  {/** 
    register: Lo agrego a cada campo, de esa forma lo puedo controlar.
              Es decir que ya crea estado para dichos campos.

    handleSubmit: Permite controlar el Submit.

    formState: Me da el valor actual de cómo está el formulario, 
              y si alguno falla crea un objeto de valor error y me indica cuál input ha fallado.
  
    watch: Trae el estado actual de cada propiedad

    setValue: Sirve para crear un campo nuevo

    reset: reinicia los valores de los campos
  
  */}
  return (
    <form onSubmit={onSubmit}>
      
      {/** nombre */}
      <label htmlFor='nombre'>
        Nombre
      </label>
      <input 
        type='text'
        { ... register("nombre", {
          required: true,
          minLength: 2,
          maxLength: 30
          }
        )}
      />
      { errors.nombre?.type === 'required' && <span>Nombre es requerido</span> }
      { errors.nombre?.type === 'minLength' && <span>Nombre debe tener al menos 2 caracteres</span> }
      { errors.nombre?.type === 'maxLength' && <span>Nombre puede tener hasta 30 caracteres</span> }
      

      {/** con erros.nombre, el mensaje se muestra cuando falla nombre */}

      {/** correo */}
      <label htmlFor='correo'>
        Correo
      </label>
      <input 
        type="email"
        { ... register("correo", {
          required: {
            value: true,
            message: "Correo es requerido"
          },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,4}$/,
            message: "Correo no válido"
          }
          }
        )}
      />
      {
        errors.correo && <span>{errors.correo.message}</span>
      }

      {/** password */}
      <label htmlFor='password'>
        Password
      </label>
      <input 
        type='password'
        { ... register("password", {
          required: {
            value: true,
            message: "Password es requerido"
          },
          minLength: {
            value: 8,
            message: "Password debe tener al menos 8 caracteres"
          }
          }
        )}
      />
      {
        errors.password && <span>{errors.password.message}</span>
      }

      {/** confirmarPassword */}
      <label htmlFor='confirmarPassword'>
        Confirmar Password
      </label>
      <input 
        type='password'
        { ... register("confirmarPassword", {
          required: {
            value: true,
            message: "Confirmar contraseña es requerido"
          },
          validate: value => value === watch('password') || 'Los passwords no coinciden'
          // validate: (value) => {
          //   if (value === watch("password")) {
          //     return true
          //   } else {
          //     return "Los passwords no coinciden"
          //   }
          // }
        }
        )} 
      />
      {
        errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>
      }

      {/** fechaNacimiento */}
      <label htmlFor='fechaNacimiento'>
        Fecha de Nacimiento
      </label>
      <input 
        type='date'
        { ... register("fechaNacimiento", {
            required: {
              value: true,
              message: "Fecha de nacimiento es requerida"
            },
            validate: (value) => {
              const fechaNacimiento = new Date(value)
              const fechaActual = new Date()
              const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()

              return edad >= 18 || "Debe ser mayor de edad"
              
              // if (edad >= 18) {
              //   return true
              // } else {
              //   return "Debe ser mayor de edad"
              // }
            } 
          }
        )}
      />
      {
        errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
      }


      {/** pais */}
      <label htmlFor='pais'>
        Pais
      </label>
      <select { ... register("pais")} >
        <option value='ar'>Argentina</option>
        <option value='co'>Colombia</option>
        <option value='mx'>México</option>
      </select>

      {
        watch('pais') === 'ar' && (
          <>
            <input 
              type='text' 
              placeholder='Provincia'
              { ... register('provincia', {
                required: {
                  value: true,
                  message: "Provincia es requerida"
                }
              })}
            />
            { errors.provincia && <span>{errors.provincia.message}</span>}
          </>
        )
      }

      {/** file */}
      <label htmlFor='foto'>
        Foto de perfil
      </label>
      <input 
        type="file"
        onChange={(e) => {
          console.log(e.target.files[0])
          setValue('fotoDelUsuario', e.target.files[0].name)
        }} 
      />

      {/** terminos */}
      <label htmlFor='terminos'>
        Acepto términos y condiciones
      </label>
      <input 
        type='checkbox'
        { ... register("terminos", {
          required: {
            value: true,
            message: "Debe aceptar los términos y condiciones"
          }
          }
        )} 
      />
      { errors.terminos && <span>{errors.terminos.message}</span> }

      <button>
        Enviar
      </button>

      <pre>
        {/** lo utilizo para mostrar el contenido del objeto watch */}
        {JSON.stringify(watch(), null, 2)}
        {JSON.stringify(watch("password"), null, 2)}
      </pre>

    </form>
  )
}

export default App