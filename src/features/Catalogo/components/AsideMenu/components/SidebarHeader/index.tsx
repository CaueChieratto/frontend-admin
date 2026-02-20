import logo from "@assets/logo.png";
import Styles from "./SideBarHeader.module.css";

export const SideBarHeader = () => {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.titulo}>Jati Conexões</h1>
      <img src={logo} alt="Logo Jati Conexões" className={Styles.logo} />
    </div>
  );
};
