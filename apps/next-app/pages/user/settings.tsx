import { useAuth } from "@my-org/react-api-client/users/use-auth";
import { useUser } from "@my-org/react-api-client/users/use-user";
import { useUserPermissions } from "@my-org/react-api-client/users/use-user-permissions";
import { withAuthenticationRequired } from "@my-org/react-api-client/users/with-authentication-required";
import { useInputState } from "@my-org/react-api-client/util/use-input-state";
import Head from "next/head";
import { FormEventHandler, useCallback } from "react";
import Layout from "../../components/layout";
import Section from "../../components/section";

const SettingsPage = () => {
  const { user: authUser, logout } = useAuth();

  const { user, updateUser, deleteUser, isLoading, error } = useUser(
    authUser.sub
  );

  const [email, handleEmailChange] = useInputState(user?.email || "");
  const [password, handlePasswordChange] = useInputState("");

  const handleUpdateEmail: FormEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      updateUser({
        email,
      });
    },
    [email, updateUser]
  );

  const handleUpdatePassword = useCallback(
    (event) => {
      event.preventDefault();
      updateUser({
        password,
      });
    },
    [password, updateUser]
  );

  const handleDeleteUser = useCallback(
    async (event) => {
      event.preventDefault();
      if (window.confirm("Really?")) {
        await deleteUser();
        logout();
      }
    },
    [deleteUser, logout]
  );

  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>
      <Section>
        <form onSubmit={handleUpdateEmail}>
          <h2>Change Email</h2>
          <input
            type="email"
            disabled={isLoading}
            value={email}
            onChange={handleEmailChange}
          />
          <button type="submit" disabled={isLoading}>
            Save
          </button>
        </form>
      </Section>
      <Section>
        <form onSubmit={handleUpdatePassword}>
          <h2>Change Password</h2>
          <input
            type="password"
            disabled={isLoading}
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit" disabled={isLoading}>
            Save
          </button>
        </form>
      </Section>
      <Section>
        <form onSubmit={handleDeleteUser}>
          <h2>Delete Account</h2>
          <button type="submit" disabled={isLoading}>
            Delete
          </button>
        </form>
      </Section>
    </Layout>
  );
};

export default withAuthenticationRequired(SettingsPage);
