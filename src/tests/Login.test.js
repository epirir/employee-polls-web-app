import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Login from "../components/Login";
import { handleInitialData } from "../actions/shared";

describe("Login", () => {
  it("should render the component", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  it("should clear input elements after clicking submit button", async () => {
    await store.dispatch(handleInitialData());

    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const testIds = ["login-heading", "username", "password", "submit"];

    testIds.forEach((testId) => {
      expect(view.getByTestId(testId)).toBeInTheDocument();
    });

    const username = view.getByTestId("username");
    const password = view.getByTestId("password");
    const submit = view.getByTestId("submit");
    const loginHeading = view.getByTestId("login-heading");

    fireEvent.change(username, { target: { value: "sarahedo" } });
    fireEvent.change(password, {
      target: { value: "wrongpassword" },
    });
    expect(username.value).toBe("sarahedo");
    expect(password.value).toBe("wrongpassword");
    fireEvent.click(submit); // User stays on page
    expect(loginHeading).toBeInTheDocument();
    expect(username.value).toBe("");
    expect(password.value).toBe("");
  });
});
