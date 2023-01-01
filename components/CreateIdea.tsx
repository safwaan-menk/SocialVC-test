import { useState } from "react";
import {
  Box,
  Button,
  Code,
  Group,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import { dehydrate, useMutation } from "react-query";
import Head from "next/head";
import { queryClient, createIdea } from "../src/api";
import Link from "next/link";
import { IdeaInput } from "../src/generated/graphql";
import { Idea } from "../src/schema/ideas";

export async function getServerSideProps() {
  await queryClient.prefetchQuery("ideas", () =>
    createIdea({ data: { id: "", idea: "", description: "" } })
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default function CreateIdea(props: any) {
  const [submittedValues, setSubmittedValues] = useState("");
  const [setData] = useMutation(() => createIdea);

  const form = useForm({
    initialValues: {
      idea: "",
      description: "",
    },
    transformValues: (values) => ({
      idea: `${values.idea}`,
      description: `${values.description}`,
    }),
  });

  return (
    <>
      <Modal
        opened={props.opened}
        onClose={() => props.closePost()}
        title="Introduce yourself!"
      >
        <Box sx={{ maxWidth: 400 }} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => {
              setSubmittedValues(JSON.stringify(values, null, 2));
              setData({
                data: {
                  id: 5,
                  idea: "hello",
                  description: "goodbye",
                },
              });
            })}
          >
            <div style={{ maxWidth: 320, margin: "auto" }}>
              <TextInput
                label="Idea"
                placeholder="What are you building?"
                {...form.getInputProps("idea")}
              />
              <Textarea
                mt="sm"
                label="Description"
                placeholder="Interesting...tell us a bit more"
                {...form.getInputProps("description")}
              />

              <Group position="center" mt="xl">
                <Button variant="outline" type="submit">
                  Set Values
                </Button>
              </Group>
            </div>
          </form>

          {submittedValues && <Code block>{submittedValues}</Code>}
        </Box>
      </Modal>
    </>
  );
}
