import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "2hiqwyp4",
  dataset: "production",
  apiVersion: "2026-01-26",
  useCdn: false,
};

const client = createClient(config);

export default client;
