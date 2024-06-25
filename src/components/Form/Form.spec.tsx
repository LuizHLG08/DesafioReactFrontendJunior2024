import { render, fireEvent, screen } from "@testing-library/react";
import { Form } from "./";
import { TodoContext } from "../../providers/TodoContext";
import { mockContext, mockContextEmpty } from "../../.jest/mocks/fileMock";

describe("Form component", () => {
    test("should render form correctly", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <Form />
            </TodoContext.Provider >
        );

        const todoForm = screen.getByTestId("todoForm");
        expect(todoForm).toBeDefined();
    });
    test("should render selectButton correctly", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <Form />
            </TodoContext.Provider >
        );
        const selectButton = screen.getByTestId("selectButton");
        expect(selectButton).toBeDefined();
    });

    test("selectButton should work correctly", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <Form />
            </TodoContext.Provider >
        );
        const selectButton = screen.getByTestId("selectButton");
        fireEvent.click(selectButton);
        expect(mockContext.toggleAllTodos).toHaveBeenCalledTimes(1);
    });

    test("selectButton should not be rendered if todoList is empty", () => {
        render(
            <TodoContext.Provider value={mockContextEmpty}>
                <Form />
            </TodoContext.Provider >
        );
        const selectButton = screen.queryByTestId("selectButton");
        expect(selectButton).toBeNull();
    });

    test("should render input correctly", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <Form />
            </TodoContext.Provider >
        );
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
    });
});
