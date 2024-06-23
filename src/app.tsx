import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import "./styles/index.scss"

export default function App() {
  return (
    <>
      <Header />
      <section className="formAndListSection">
        <Form />
        <TodoList />
      </section>
    </>
  );
}
