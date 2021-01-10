import { combineReducers } from "redux";

import posts from "./postReducer";
import authAdmin from "./authAdminReducer";
import agregarCategoria from "./agregarCategoriaReducer";
import listaCategorias from "./obtenerCategoriasReducer";
import actualizarCategoria from "./actualizarCategoriaReducer";
import obtenerProductos from "./obtenerProductosReducer";
import actualizarProducto from "./actualizarProductoReducer";
import obtenerProductosPorCategoria from "./buscarProductosPorCategoriaReducer";
import cartReducer from "./cartReducer";
import buscarUnProducto from "./buscarUnProductoReducer";
import productosInicioReducer from "./productosInicioReducer";
import authUser from "./authUserReducer";
// import otro from ...
export default combineReducers({
  authAdmin,
  posts,
  agregarCategoria,
  listaCategorias,
  actualizarCategoria,
  obtenerProductos,
  actualizarProducto,
  obtenerProductosPorCategoria,
  cartReducer,
  buscarUnProducto,
  productosInicioReducer,
  authUser,
  // otro
});
