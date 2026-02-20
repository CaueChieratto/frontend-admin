import Styles from "./DefaultLoader.module.css";

type DefaultLoaderProps = {
  inCard?: boolean;
};

export const DefaultLoader = ({ inCard }: DefaultLoaderProps) => {
  return (
    <div className={!inCard ? Styles.container : Styles.container_in_card}>
      <svg className={Styles.svg} viewBox="25 25 50 50">
        <circle className={Styles.circle} r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};
