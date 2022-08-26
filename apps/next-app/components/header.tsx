import Image from "next/image";
import Link from "next/link";
import logoImage from "../public/logo.png";
import styles from "./header.module.css";

interface Props {}

/**
 * Contains horizontal bar at the top
 */
const Header = ({}: Props) => {
  return (
    <header className={styles.container}>
      <nav>
        <Link href="/">
          <a>
            <Image alt="" src={logoImage} width={32} height={32} />
          </a>
        </Link>
        <Link href="/items">
          <a>Items</a>
        </Link>
      </nav>
      <nav></nav>
      <nav></nav>
    </header>
  );
};

export default Header;
