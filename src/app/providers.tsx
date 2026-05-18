"use client";

import { makeStore } from "@/lib/store";
import { Provider } from "react-redux";

const store = makeStore();

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
