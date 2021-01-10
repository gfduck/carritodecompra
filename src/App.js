import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NuevoProducto from "./dashboard/Pages/NuevoProducto";
import { Provider } from "react-redux";
import store from "./redux/store";

import Loading from "./Components/Loading";
import ProductosHome from "./Pages/Productos";

import Inicio from "./Pages/Inicio";

import Docs from "./Pages/Docs";
import Producto from "./Pages/Producto";

const Grid = lazy(() => import("./GridSystem/Grid"));
const Categorias = lazy(() => import("./dashboard/Pages/Categorias"));
const DocsAdmin = lazy(() => import("./dashboard/Pages/DocsAdmin"));
const Admin = lazy(() => import("./dashboard/Pages/Admin"));
const NuevaCategoria = lazy(() => import("./dashboard/Pages/NuevaCategoria"));
const Productos = lazy(() => import("./dashboard/Pages/Productos"));
const EditarProducto = lazy(() => import("./dashboard/Pages/EditarProducto"));
const Login = lazy(() => import("./dashboard/Pages/Login"));
const Pagar = lazy(() => import("./Pages/Pagar"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Route exact path="/">
            <Grid componente={<Inicio />} />
          </Route>
          <Route path="/productos/:categoria" exact>
            <Grid componente={<ProductosHome />} />
          </Route>
          <Route path="/categoria/:categoria/:nombreProducto" exact>
            <Grid componente={<Producto />} />
          </Route>
          <Route exact component={Pagar} path="/pagar" />

          <Route exact component={Docs} path="/docs" />
          {/* Paginas de Administrador */}
          <Route path="/admin" component={Admin}></Route>

          <Route exact path="/admin/categorias" component={Categorias} />
          <Route exact path="/admin/docs" component={DocsAdmin} />

          <Route
            path="/admin/categorias/nuevacategoria"
            component={NuevaCategoria}
          />
          <Route exact path="/admin/productos" component={Productos} />
          <Route
            path="/admin/productos/nuevoproducto"
            component={NuevoProducto}
          />

          <Route
            path="/admin/productos/editarproducto/:id"
            component={EditarProducto}
          />

          <Route exact path="/admin/login" component={Login} />
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
