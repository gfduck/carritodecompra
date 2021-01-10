import Carrito from "./../Components/Carrito";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from "./../redux/store";
import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

configure({ adapter: new Adapter() });
describe("pruebas", () => {
  test("debe mostrar componente", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Carrito />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("debe mostrar titulo carrito", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Carrito />
      </Provider>
    );

    const titulo = getByTestId("tituloCarrito");

    expect(titulo).toBeTruthy();
  });
});
