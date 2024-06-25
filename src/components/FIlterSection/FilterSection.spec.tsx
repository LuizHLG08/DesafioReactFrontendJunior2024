import { fireEvent, render, screen } from "@testing-library/react";
import { FilterSection } from ".";
import { mockContext } from "../../.jest/mocks/fileMock";
import { TodoContext } from "../../providers/TodoContext";

describe("FilterSection", () => {
    test("should render correctly", () => {
        render(<FilterSection />);
        const filterSection = screen.getByTestId("filterSection");

        expect(filterSection).toBeDefined();
    });

    test("buttons should trigger a function", () => {
        render(
            <TodoContext.Provider value={mockContext}>
                <FilterSection />
            </TodoContext.Provider>
        );

        const allButton = screen.getByTestId("button1");
        const activeButton = screen.getByTestId("button2");
        const completedButton = screen.getByTestId("button3");
        const clearButton = screen.getByTestId("clearButton");

        fireEvent.click(allButton);
        expect(mockContext.getAllTodos).toHaveBeenCalledTimes(1);

        fireEvent.click(activeButton);
        expect(mockContext.getActiveTodos).toHaveBeenCalledTimes(1);

        fireEvent.click(completedButton);
        expect(mockContext.getCompletedTodos).toHaveBeenCalledTimes(1);

        fireEvent.click(clearButton);
        expect(mockContext.clearCompleted).toHaveBeenCalledTimes(1);
    });
});