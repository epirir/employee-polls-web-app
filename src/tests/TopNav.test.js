import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import TopNav from "../components/TopNav";
import { setAuthedUser } from "../actions/authedUser";

describe("TopNav", () => {
  it("should render the component", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "" }));

    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <TopNav />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  it("should display username of logged in user", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "password123" }));

    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <TopNav />
        </BrowserRouter>
      </Provider>
    );

    const userSpanElement = view.getByTestId("user-information");
    expect(userSpanElement.textContent).toBe("sarahedo");
  });
});
