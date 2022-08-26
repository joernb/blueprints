import { CSSProperties } from "react";
import styles from "./section.module.css";

interface Props {
  children?: React.ReactNode;
  style?: CSSProperties;
  colored?: boolean;
}

/**
 * Sections are vertical page parts that are visually separated (border, background color/image, ...)
 */
const Section = ({ children, style, colored }: Props) => {
  return (
    <section
      className={`${styles.container} ${colored ? styles.colored : ""}`}
      style={style}
    >
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default Section;
