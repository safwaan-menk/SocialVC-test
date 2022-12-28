import {
  AppShell,
  Navbar,
  Header,
  Stack,
  Button,
  Group,
  Grid,
  Card,
  Image,
  Text,
  Title,
  Box,
} from "@mantine/core";
import CreateIdea from "./CreateIdea";
import { useState } from "react";

import { dehydrate, useQuery } from "react-query";
import Head from "next/head";
import { queryClient, getIdeas } from "../src/api";
import Link from "next/link";

export async function getServerSideProps() {
  await queryClient.prefetchQuery("ideas", () => getIdeas());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export function Start(props: any) {
  const [opened, setOpened] = useState(false);
  const { data } = useQuery(["ideas"], () => getIdeas());

  function createPost() {
    setOpened(true);
  }

  function closePost() {
    setOpened(false);
  }
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Stack
            justify={"center"}
            spacing="xl"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: 300,
            })}
          >
            <Button variant="outline">Ideas</Button>
            <Button variant="outline">Pitch Decks</Button>
            <Button variant="outline">MVPs</Button>
            <Button variant="outline">Discussions</Button>
          </Stack>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
          <Group grow>
            <Group className="header-main-group" position="right" spacing="sm">
              <Button onClick={() => createPost()} variant="outline">
                Post
              </Button>
              <Button variant="outline">Randomize</Button>
            </Group>
            <Group position="right" spacing="xl">
              <Button variant="outline">Notifications</Button>
              <Button variant="outline">Profile</Button>
            </Group>
          </Group>
        </Header>
      }
    >
      <CreateIdea opened={opened} closePost={closePost}></CreateIdea>
      <div>
        <Grid>
          {data?.ideas.map((f, i) => (
            // eslint-disable-next-line react/jsx-key
            <Grid.Col xs={12} md={6} lg={4} key={[f.idea, i].join(":")} p={5}>
              <Link href={`/idea/${f.id}`} passHref>
                <Title order={3}> {f.idea}</Title>
                <Text>{f.description}</Text>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </div>
      {/* Your application here */}
    </AppShell>
  );
}
