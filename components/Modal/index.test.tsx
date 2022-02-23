/* eslint testing-library/no-node-access: 0 */

import React from "react";
import { expect } from "@jest/globals";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Component from "./index";
afterEach(() => {
  cleanup();
});
const props = {
  onClose: jest.fn(),
};

it("display content correctly when open", () => {
  render(
    <Component {...props} isOpen={true}>
      <h2>Modal title</h2>
    </Component>
  );
  expect(screen.getByText("Modal title"));
});
it("is hidden when modal is close", () => {
  render(
    <Component {...props} isOpen={false}>
      <h2>Modal title</h2>
    </Component>
  );

  const modal = screen.getByText("Modal title")?.parentNode?.parentNode;

  expect(modal).toHaveStyle("top:", "-100%");
});
it("trigger close when clicking close button", () => {
  render(
    <Component {...props} isOpen={true}>
      <h2>Modal title</h2>
    </Component>
  );
  const closeBtn = screen.getByRole("button", { name: "close" });

  expect(props.onClose.mock.calls.length).toBe(0);
  userEvent.click(closeBtn);
  expect(props.onClose.mock.calls.length).toBe(1);
});
it("trigger close when pressing Escape", () => {
  render(
    <Component {...props} isOpen={true}>
      <h2>Modal title</h2>
    </Component>
  );

  userEvent.keyboard("Escape");
  expect(props.onClose.mock.calls.length).toBe(1);
});
it("kip focus inside modal when user press tab", () => {
  render(
    <Component isOpen={true} onClose={jest.fn()}>
      <>
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />{" "}
      </>
    </Component>
  );
  const closeBtn = screen.getByRole("button", { name: "close" });
  const emailInput = screen.getByPlaceholderText("email");
  const passwordInput = screen.getByPlaceholderText("password");

  userEvent.tab();
  expect(emailInput).toHaveFocus();
  userEvent.tab();
  expect(passwordInput).toHaveFocus();
  userEvent.tab();
  expect(closeBtn).toHaveFocus();
  userEvent.tab();
  expect(emailInput).toHaveFocus();
});
