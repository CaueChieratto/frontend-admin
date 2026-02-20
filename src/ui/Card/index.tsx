import { DefaultLoader } from "../uiverse/Loaders/DefaultLoader";
import Styles from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
  isProduto?: boolean;
  aside?: boolean;
  isLoading?: boolean;
};

export const Card = ({ children, isProduto, aside, isLoading }: CardProps) => {
  if (aside) return <aside className={Styles.cardAside}>{children}</aside>;

  return (
    <section className={!isProduto ? Styles.cardMain : Styles.cardMainProdutos}>
      {isLoading ? (
        <div style={{ height: "100%" }}>
          <DefaultLoader inCard />
        </div>
      ) : (
        <>{children}</>
      )}
    </section>
  );
};
