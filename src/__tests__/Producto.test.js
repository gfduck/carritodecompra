import React from "react";
import Producto from "./../Pages/Producto";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from "./../redux/store";

import { Provider } from "react-redux";

configure({ adapter: new Adapter() });
describe("test producto", () => {
  test("debe mostrar componente producto", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Producto />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
