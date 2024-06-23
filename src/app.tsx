import "./styles/index.scss";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import { Footer } from "./components/Footer";

export default function App() {

  return (
    <>
      <Header />
      <main className="formAndListSection">
        <Form />
        <TodoList />
      </main>
      <div className="background1"></div>
      <div className="background2"></div>
      <Footer />
    </>
  );
}
