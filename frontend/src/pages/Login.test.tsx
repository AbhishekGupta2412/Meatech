import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import Login from "./Login";
import { describe, it, expect } from "vitest";

const renderWithProviders = (component: any) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("Login Component", () => {
  it("renders login form elements correctly", () => {
    renderWithProviders(<Login />);

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation error when empty form is submitted", async () => {
    renderWithProviders(<Login />);

    const button = screen.getByRole("button", { name: /login/i });
    fireEvent.click(button);

    expect(
      await screen.findByText(/expected string to have >=3/i)
    ).toBeInTheDocument();
  });
});
