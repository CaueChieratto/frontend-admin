import Styles from "./App.module.css";
import { useLinhas } from "./features/Catalogo/components/MainMenu/Linhas/hooks/useLinhas";
import { Catalogo } from "./features/Catalogo";
import { EarthLoader } from "./ui/uiverse/Loaders/EarthLoader";
import { useMinimumLoading } from "./features/Catalogo/hooks/useMinimumLoading";
import { ModalProvider } from "./providers/ModalProvider/ModalProvider";
import { ModalRoot } from "./ui/Modal/ModalRoot";

function App() {
  const linhasState = useLinhas();
  const showLoader = useMinimumLoading(linhasState.initialLoad, 2000);

  return (
    <ModalProvider>
      <div className={Styles.background}>
        {showLoader ? (
          <div className={Styles.load}>
            <EarthLoader />
          </div>
        ) : (
          <Catalogo {...linhasState} />
        )}
      </div>

      <ModalRoot />
    </ModalProvider>
  );
}

export default App;
