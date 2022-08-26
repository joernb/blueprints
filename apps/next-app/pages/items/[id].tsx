import { useItem } from "@my-org/react-api-client/items/use-item";
import { useInputState } from "@my-org/react-api-client/util/use-input-state";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import Layout from "../../components/layout";
import Section from "../../components/section";

interface Props {}

const ItemPage = ({}: Props) => {
  const router = useRouter();
  const id = router.query.id as string;
  const { item, updateItem, deleteItem, isLoading, error } = useItem(id);
  const [value, handleChangeValue] = useInputState(item ? item.value : "");

  const handleBack = useCallback(() => router.back(), [router]);

  const handleUpate = useCallback(() => {
    updateItem({
      value,
    });
  }, [value, updateItem]);

  const handleDelete = useCallback(async () => {
    await deleteItem();
    handleBack();
  }, [handleBack, deleteItem]);

  return (
    <Layout>
      <Head>
        <title>Item</title>
      </Head>
      <div>
        <button onClick={handleBack}>Back</button>
      </div>
      {error && <Section>Error: {error.toString()}</Section>}
      <Section>
        <input
          type="text"
          name="value"
          value={value}
          onChange={handleChangeValue}
          disabled={isLoading}
        />
        <div>
          <button onClick={handleUpate} disabled={isLoading}>
            Update
          </button>
          <button onClick={handleDelete} disabled={isLoading}>
            Delete
          </button>
        </div>
      </Section>
    </Layout>
  );
};

export default ItemPage;
