import { render, screen, fireEvent } from "@testing-library/react";
import { TodoCard } from "./";
import { TodoContext } from "../../../providers/TodoContext";
import { mockContext, mockTodoList } from "../../../.jest/mocks/fileMock";
import userEvent from '@testing-library/user-event';

describe("TodoCard component", () => {
    const todo = mockTodoList[0];

    test("should render TodoCard correctly", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <TodoCard todo={todo} />
            </TodoContext.Provider>
        );

        const todoCard = screen.getByTestId("todoCard");
        const title = screen.getByText(todo.title);
        
        expect(todoCard).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });

    test("should handle checkbox change correctly", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <TodoCard todo={todo} />
            </TodoContext.Provider>
        );

        const checkbox = screen.getByRole("checkbox");

        fireEvent.click(checkbox);
        expect(mockContext.editTodo).toHaveBeenCalledWith({
            id: todo.id,
            formData: { isDone: !todo.isDone }
        });
    });

    test("should enter edit mode on double click", async () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <TodoCard todo={todo} />
            </TodoContext.Provider>
        );

        const title = screen.getByText(todo.title);
        fireEvent.doubleClick(title);

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(todo.title);
    });

    test("should render edit input on doubleClick", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <TodoCard todo={todo} />
            </TodoContext.Provider>
        );

        const title = screen.getByText(todo.title);
        fireEvent.doubleClick(title);

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(todo.title);
    });

    test("should call removeTodo on remove button click", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <TodoCard todo={todo} />
            </TodoContext.Provider>
        );

        const removeButton = screen.getByRole("button");
        fireEvent.click(removeButton);

        expect(mockContext.removeTodo).toHaveBeenCalledWith(todo.id);
    });
});