import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

describe("App", () => {
  it("should render the component", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  it("should show Login page when not logged in", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const heading = view.getByTestId("login-heading");
    expect(heading).toBeInTheDocument();
  });

  it("should show Dashboard page when logged in", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "password123" }));

    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const heading = view.getByTestId("heading");
    expect(heading).toBeInTheDocument();
  });
});
