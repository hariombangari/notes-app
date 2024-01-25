"use server";
import { createClient } from "redis";

const client = createClient({
  password: process.env.REDIS_PWD,
  socket: {
    host: "redis-19272.c323.us-east-1-2.ec2.cloud.redislabs.com",
    port: 19272,
  },
});

client.on("connect", () => {
  console.log("client connected to redis...");
});

client.on("error", (err) => {
  console.log("redis error", err.message);
});

client.on("ready", (err) => {
  console.log("Client is ready to connect redis");
});

client.on("end", (err) => {
  console.log("Client is disconnected from redis");
});

process.on("SIGINT", () => {
  client.quit();
});

export async function set(key, hashData) {
  if (!client.isOpen) {
    await client.connect();
  }
  const data = {};
  for (const [key, value] of Object.entries(hashData)) {
    data[key] = String(value);
  }
  return await client.hSet(key, data);
}

export async function get(key) {
  if (!client.isOpen) {
    await client.connect();
  }
  return await client.hGetAll(key);
}

export async function search(index, query) {
  if (!client.isOpen) {
    await client.connect();
  }
  return await client.ft.search(index, query);
}

export async function del(key) {
  if (!client.isOpen) {
    await client.connect();
  }
  return await client.del(key);
}
