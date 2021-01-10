import * as yup from "yup";

const schema = yup.object().shape({
  nombre: yup
    .string()
    .min(1, "el minimo es 1 caracter")
    .max(20, "Maximo")
    .required("Campo Nombre es obligatorio"),
  descripcion: yup.string().required("Campo Descripción es obligatorio"),
  // precio: yup
  //   .number()
  //   // .min(3, "minimo de precio")
  //   .required("Campo Precio es obligatorio"),
  precio: yup
    .number()
    .typeError("Campo Precio es obligatorio")
    .required("Campo Precio es obligatorio")
    .positive()
    .integer(),
  validacion: yup.string().required(),
});

const schemaCategoria = yup.object().shape({
  categoria: yup.string().required("Campo Categoria es obligatorio"),
});

const schemaActualizarProducto = yup.object().shape({
  nombre: yup
    .string()
    .min(1, "el minimo es 1 caracter")
    .max(20, "Maximo")
    .required("Campo Nombre es obligatorio"),
  descripcion: yup.string().required("Campo Descripción es obligatorio"),

  precio: yup
    .number()
    .typeError("Campo Precio es obligatorio")
    .required("Campo Precio es obligatorio")
    .positive()
    .integer(),
});

const schemaLoginAdmin = yup.object().shape({
  email: yup
    .string()
    .email()

    .required("Campo email es obligatorio"),
  password: yup.string().required("Campo contraseña es obligatorio"),
});

export { schema, schemaCategoria, schemaActualizarProducto, schemaLoginAdmin };
