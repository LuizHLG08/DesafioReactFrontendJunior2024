import { useContext } from "react";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import "./styles/index.scss"
import { TodoContext } from "./providers/TodoContext";
import { FilterSection } from "./components/FIlterSection";
import { Footer } from "./components/Footer";

export default function App() {

  const { todoList } = useContext(TodoContext)

  return (
    <>
      <Header />
      <main className="formAndListSection">
        <Form />
        <TodoList />
      </main>
      <Footer />
    </>
  );
}
