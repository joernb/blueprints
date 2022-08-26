import Head from "next/head";
import Footer from "./footer";
import Header from "./header";
import styles from "./layout.module.css";

interface Props {
  children: React.ReactNode;
}

/**
 * Encapsulates layout decisions for pages.
 */
const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className={styles.main}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
