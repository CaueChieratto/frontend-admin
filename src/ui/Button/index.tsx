import Styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  color: string;
  border?: string;
  fontColor?: string;
  minWidth?: string;
  onClick?: () => void;
  gridColumn?: string;
};

export const Button = ({
  text,
  color,
  fontColor,
  border,
  onClick,
  minWidth,
  gridColumn,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: fontColor,
        border: border,
        minWidth: minWidth,
        gridColumn: gridColumn,
      }}
      className={Styles.button}
    >
      {text}
    </button>
  );
};
