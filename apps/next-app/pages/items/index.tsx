import Head from "next/head";
import React, { useCallback } from "react";
import Layout from "../../components/layout";
import Section from "../../components/section";
import { useItems } from "@my-org/react-api-client/items/use-items";
import Link from "next/link";
import { withAuthenticationRequired } from "@my-org/react-api-client/users/with-authentication-required";

interface Props {}

const ItemsPage = ({}: Props) => {
  const { items, createItem, isLoading, error } = useItems();
  const handleCreateItem = useCallback(() => {
    createItem({
      value: "New",
    });
  }, [createItem]);

  return (
    <Layout>
      <Head>
        <title>Items</title>
      </Head>
      {error && <Section>Error: {error.toString()}</Section>}
      {items && (
        <Section>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <Link href={`/items/${item.id}`} passHref>
                  <a>{item.value}</a>
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={handleCreateItem}>+</button>
          </div>
        </Section>
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(ItemsPage);
