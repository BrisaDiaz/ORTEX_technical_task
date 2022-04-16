import React from "react";
import { expect } from "@jest/globals";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Component from "./index";

const props = {
  onForgotPassword: jest.fn(),
  onSubmit: jest.fn(),
};

afterEach(() => {
  cleanup();
});
it("displays errors messages and avoid submit when setting incorrect inputs values", async () => {
  render(<Component {...props} />);

  const emailInput = screen.getByPlaceholderText("email*", { exact: false });
  const passwordInput = screen.getByPlaceholderText("password*", {
    exact: false,
  });

  userEvent.type(emailInput, "randomText");
  userEvent.type(passwordInput, "insecurePassword");
  userEvent.click(screen.getByRole("button"));
  expect(props.onSubmit.mock.calls.length).toBe(0);
  expect(screen.getByText("Please insert a valid email", { exact: false }));
  expect(
    screen.getByText("Insecure password. Exp: MyLongP@ssword8", {
      exact: false,
    })
  );
});
it("displays errors messages and avoid submit when not skipping any required field", async () => {
  render(<Component {...props} />);

  const emailInput = screen.getByPlaceholderText("email*", { exact: false });
  const passwordInput = screen.getByPlaceholderText("password*", {
    exact: false,
  });

  userEvent.type(emailInput, "userEmail@email.com");

  userEvent.click(screen.getByRole("button"));

  expect(
    screen.getByText("Password is required", {
      exact: false,
    })
  );

  userEvent.clear(emailInput);
  userEvent.type(passwordInput, "MyLongP@ssword8");
  userEvent.click(screen.getByRole("button"));

  expect(
    screen.getByText("Email is required", {
      exact: false,
    })
  );
  expect(props.onSubmit.mock.calls.length).toBe(0);
});
it("submits when setting corrects values", async () => {
  render(<Component {...props} />);

  const emailInput = screen.getByPlaceholderText("email*", { exact: false });
  const passwordInput = screen.getByPlaceholderText("password*", {
    exact: false,
  });

  userEvent.type(emailInput, "userEmail@email.com");

  userEvent.type(passwordInput, "MyLongP@ssword8");
  userEvent.click(screen.getByRole("button"));

  expect(props.onSubmit.mock.calls.length).toBe(1);
  expect(props.onSubmit.mock.calls[0][0]).toEqual({
    email: "userEmail@email.com",
    password: "MyLongP@ssword8",
  });
});
it("triggers onForgotPassword callback when clicking Forgot your password?", async () => {
  render(<Component {...props} />);

  userEvent.click(screen.getByText("Forgot your password?"));

  expect(props.onForgotPassword.mock.calls.length).toBe(1);
});
it("triggers onForgotPassword callback when being in focus and  pressing enter ", async () => {
  render(<Component {...props} />);
  const forgetPasswordTrigger = screen.getByText("Forgot your password?");

  userEvent.tab(forgetPasswordTrigger as any);

  expect(props.onForgotPassword.mock.calls.length).toBe(1);
});
