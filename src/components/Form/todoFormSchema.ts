import z from "zod";

export const todoFormSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, {message: "Escreva uma tarefa"}),
    isDone: z.boolean().optional()
});

export type TodoFormSchema = z.infer<typeof todoFormSchema>;