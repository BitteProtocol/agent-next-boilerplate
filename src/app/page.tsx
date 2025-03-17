"use client";
import { RedocStandalone } from "redoc";

export default function Home() {
  return (
    <RedocStandalone
      specUrl="/.well-known/ai-plugin.json"
      options={{
        theme: {
          colors: {
            primary: { main: "#ffffff" },
            text: { primary: "#000000" },
          },
        },
      }}
    />
  );
}
