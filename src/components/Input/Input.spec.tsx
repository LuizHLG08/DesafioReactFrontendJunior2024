import { render, screen } from "@testing-library/react";
import { Input } from ".";
import { createRef } from "react";

describe('Input component', () => {
    test('should render the input without label', () => {
      render(<Input data-testid="input-element" />);
  
      const inputElement = screen.getByTestId('input-element');
      expect(inputElement).toBeInTheDocument();
  
      const labelElement = screen.queryByLabelText(/input label/i);
      expect(labelElement).toBeNull();
    });
  
    test('should render the input with label', () => {
      render(<Input label="Input Label" data-testid="input-element" />);
  
      const inputElement = screen.getByTestId('input-element');
      expect(inputElement).toBeInTheDocument();
  
      const labelElement = screen.getByText(/Input Label/i);
      expect(labelElement).toBeInTheDocument();
    });
  
    test('should forward ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} data-testid="input-element" />);
  
      const inputElement = screen.getByTestId('input-element');
      expect(ref.current).toBe(inputElement);
    });
  
    test('should pass additional props to input element', () => {
      render(<Input placeholder="Test Placeholder" data-testid="input-element" />);
  
      const inputElement = screen.getByTestId('input-element');
      expect(inputElement).toHaveAttribute('placeholder', 'Test Placeholder');
    });
  });