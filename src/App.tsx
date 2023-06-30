import { Provider } from "./app/providers/context";
import { MainPage } from "./pages";
import "./App.css";

function App() {
    return (
        <Provider>
            <MainPage />
        </Provider>
    );
}

export default App;
