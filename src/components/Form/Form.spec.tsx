import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './';
import { TodoProvider } from '../../providers/TodoContext';
import { ITodo } from '../../interfaces';

describe('Form component', () => {
    it('should render form correctly', () => {
        render(
            <TodoProvider>
                <Form />
            </TodoProvider>
        );

        const todoForm = screen.getByTestId("todoForm");
        expect(todoForm).toBeDefined();
    });
});
