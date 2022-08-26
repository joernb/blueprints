import styles from "./footer.module.css";

interface Props {}

/**
 * Contains horizontal bar at the bottom of each page
 */
const Footer = ({}: Props) => {
  return <footer className={styles.container}></footer>;
};

export default Footer;
