import { CSSProperties } from "react";
import styles from "./row.module.css";

interface Props {
  children: React.ReactNode;
  style?: CSSProperties;
}

/**
 * Horizontal layout helper
 */
const Row = ({ children, style }: Props) => {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
};

export default Row;
