import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);
  const header = screen.getByText(/checkout form/i);

  expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
  render(<CheckoutForm />);

  const firstNameInput = screen.getByLabelText(/first name:/i);
  const lastNameInput = screen.getByLabelText(/last name:/i);
  const addressInput = screen.getByLabelText(/address:/i);
  const cityInput = screen.getByLabelText(/city:/i);
  const stateInput = screen.getByLabelText(/state:/i);
  const zipInput = screen.getByLabelText(/zip:/i);

  fireEvent.change(firstNameInput, { target: { value: "Desmond" } });
  fireEvent.change(lastNameInput, { target: { value: "Dyer" } });
  fireEvent.change(addressInput, { target: { value: "12345 Example Street" } });
  fireEvent.change(cityInput, { target: { value: "Long Beach" } });
  fireEvent.change(stateInput, { target: { value: "California" } });
  fireEvent.change(zipInput, { target: { value: "67891" } });

  const checkoutBtn = screen.getByRole("button", { name: /checkout/i });

  fireEvent.click(checkoutBtn);

  expect(screen.getByText(/desmond/i)).toBeInTheDocument();
  expect(screen.getByText(/dyer/i)).toBeInTheDocument();
  expect(screen.getByText(/12345 Example Street/i)).toBeInTheDocument();
  expect(screen.getByText(/Long Beach/i)).toBeInTheDocument();
  expect(screen.getByText(/California/i)).toBeInTheDocument();
  expect(screen.getByText(/67891/i)).toBeInTheDocument();
  expect(
    screen.getByText(/You have ordered some plants! Woo-hoo!/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Your new green friends will be shipped to:/i)
  ).toBeInTheDocument();
});
