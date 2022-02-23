import React from "react";
import {expect} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import Image from "next/image";

import Component from "./index";

const secondaryColor = "#ea4a48",
  primaryColor = "#33afaa";

it("displays error styles when errors", () => {
  render(
    <Component
      alertProps={{id: "email-error"}}
      errors={["email is required"]}
      icon={
        <Image
          alt="email"
          layout="fill"
          loading="eager"
          objectFit="contain"
          src="/icons/mail.svg"
        />
      }
      inputProps={{name: "email"}}
    />,
  );

  expect(screen.getByText("email is required")).toHaveStyle("color:", secondaryColor);
  expect(screen.getByRole("textbox")).toHaveStyle("border-color:", secondaryColor);
});
it("display default styles when there is not errors", () => {
  render(
    <Component
      alertProps={{id: "email-error"}}
      errors={[]}
      icon={
        <Image
          alt="email"
          layout="fill"
          loading="eager"
          objectFit="contain"
          src="/icons/mail.svg"
        />
      }
      inputProps={{name: "email"}}
    />,
  );

  expect(screen.getByRole("textbox")).toHaveStyle("border-color:", primaryColor);
});
