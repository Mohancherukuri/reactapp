import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect"; // for the 'toBeInTheDocument' matcher
import LoginForm from "./LoginForm"; // Import the LoginForm component

describe("LoginForm Component", () => {
  // Test case: Should render the login form correctly
  test("renders login form correctly", () => {
    render(<LoginForm />);

    // Check if the email and password fields are in the document
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
  });

  // Test case: Should show error if email or password is missing
  test("shows error message when fields are empty and form is submitted", () => {
    render(<LoginForm />);

    // Simulate form submission without filling in any fields
    fireEvent.click(screen.getByText(/log in/i));

    // Check if the error message appears
    expect(screen.getByText(/both fields are required!/i)).toBeInTheDocument();
  });

  // Test case: Should submit the form with correct data
  test("should handle valid form submission", () => {
    render(<LoginForm />);

    // Fill the form with valid values
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/log in/i));

    // Check that the error message is not shown
    expect(
      screen.queryByText(/both fields are required!/i)
    ).not.toBeInTheDocument();

    // You can also check if the submitted values are logged or handled correctly (for example, via mock functions)
    // Since there's no actual API call in the component, you can skip this step for now.
  });

  // Test case: Should not submit with empty fields
  test("should not submit if email or password is empty", () => {
    render(<LoginForm />);

    // Try to submit with only email field filled
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText(/log in/i));

    // Check that the error message appears for missing password
    expect(screen.getByText(/both fields are required!/i)).toBeInTheDocument();
  });
  test("should handle valid form submission", () => {
    const mockSubmit = jest.fn();
    console.log = mockSubmit; // Mocking console.log

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/log in/i));

    expect(mockSubmit).toHaveBeenCalledWith("Logging in with:", {
      email: "test@example.com",
      password: "password123",
    });
  });
});
