import { useState } from "react";
import { dehydrate, useQuery } from "react-query";
import Head from "next/head";
import { queryClient, ideaByName } from "../../src/api";
import Link from "next/link";
import React from "react";
import { stringify } from "querystring";
import { Button, Grid, JsonInput, Title } from "@mantine/core";

export async function getServerSideProps({ params }) {
  await queryClient.prefetchQuery("idea", () => ideaByName({ id: params.id }));
  return {
    props: {
      id: params.id,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Idea: React.FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const { data } = useQuery("idea", () => ideaByName({ id }));

  if (!data?.idea) return <div> no idea sorry</div>;
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid>
        <Grid.Col xs={12} md={12} lg={12}>
          <Title> {data.idea.idea}</Title>
          <Title order={1}>{data.idea.description}</Title>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Idea;
