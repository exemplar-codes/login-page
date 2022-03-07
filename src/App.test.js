import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  describe("Not logged in", () => {
    describe("On the login page", () => {
      it("Username and password field exists", () => {
        render(<App />);

        expect(screen.getByLabelText("E-Mail")).toBeDefined();
        expect(screen.getByLabelText("Password")).toBeDefined();
      });

      it("Heading exists", () => {
        render(<App />);

        expect(screen.getByText("A Typical Page")).toBeDefined();
      });
    });
    describe("Able to enter login creds", () => {
      render(<App />);

      const emailInputElement = screen.getByLabelText("E-Mail");
      const passwordInputElement = screen.getByLabelText("Password");

      it("Able to enter creds", () => {
        fireEvent.change(emailInputElement, {
          target: { value: "abc@xyz.com" },
        });
        fireEvent.change(passwordInputElement, {
          target: { value: "1234567" },
        });

        expect(emailInputElement.value).toBe("abc@xyz.com");
        expect(passwordInputElement.value).toBe("1234567");
      });

      it.only("Able to login with creds", () => {
        fireEvent.change(emailInputElement, {
          target: { value: "abc@xyz.com" },
        });
        fireEvent.change(passwordInputElement, {
          target: { value: "1234567" },
        });

        const button = screen.getByRole("button", true);
        userEvent.click(button);
        expect(screen.getByText("Welcome back!")).toBeDefined();
      });
    });
  });
});
