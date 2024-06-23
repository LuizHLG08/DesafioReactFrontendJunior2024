import "./styles/index.scss";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import { Footer } from "./components/Footer";
import { useContext } from "react";
import { TodoContext } from "./providers/TodoContext";

export default function App() {

  const { backupTodoList } = useContext(TodoContext)

  return (
    <>
      <Header />
      <main className="formAndListSection">
        <Form />
        <TodoList />
      </main>
      {backupTodoList.length > 0 && (
        <>
          <div className="background1"></div>
          <div className="background2"></div>
        </>
      )}
      <Footer />
    </>
  );
}
