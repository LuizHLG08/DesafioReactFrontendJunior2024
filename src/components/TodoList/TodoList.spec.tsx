import { render, screen } from "@testing-library/react";
import { TodoList } from ".";
import { TodoContext } from "../../providers/TodoContext";
import {mockContext, mockContextEmpty} from "../../.jest/mocks/fileMock"


describe("TodoList component", () => {
    test("should render todoList and cards correctly", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <TodoList />
            </TodoContext.Provider>
        );

        const todoList = screen.getByTestId("todoList");
        const li = todoList.querySelector("li");

        expect(todoList).toBeDefined();
        expect(li).toBeDefined();
    });

    test("should render filterSection correctly", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <TodoList />
            </TodoContext.Provider>
        );

        const filterSection = screen.getByTestId("filterSection");

        expect(filterSection).toBeDefined();
    });

    test("should not render todoList when it is empty", () => {
        render(
            <TodoContext.Provider value={mockContextEmpty}>
                <TodoList />
            </TodoContext.Provider>
        );
        const li = screen.queryByRole("listitem");
        expect(li).toBeNull();
    });

    test("should not render filterSection when todoList is empty", () => {
        render(
            <TodoContext.Provider value={mockContextEmpty}>
                <TodoList />
            </TodoContext.Provider>
        );
        const filterSection = screen.queryByTestId("filterSection");
        expect(filterSection).toBeNull();
    });
  });