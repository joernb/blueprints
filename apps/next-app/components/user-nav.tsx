import { useAuth } from "@my-org/react-api-client/users/use-auth";
import Link from "next/link";
import { useCallback, useState } from "react";
import styles from "./user-nav.module.css";

interface Props {}

const UserNav = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen]);

  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <a onClick={toggleOpen} className={styles.button}>
          {user?.name}
        </a>
      ) : (
        <a onClick={login}>Login</a>
      )}
      <nav className={`${styles.menu} ${open ? styles.open : ""}`}>
        <ul>
          <li>
            <Link href="/payment/subscription">
              <a>Subscription</a>
            </Link>
          </li>
          <li>
            <Link href="/user/settings">
              <a>Settings</a>
            </Link>
          </li>
          <li>
            <a onClick={logout}>Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNav;
