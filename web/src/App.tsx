import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./utils/trpc";

interface Props {
  name: string;
  age: number;
}

const MySubComponent = (props: Props) => {
  return <div>{props.name}</div>;
};

const MyComponent = () => {
  const { data } = trpc.hello.greeting.useQuery();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MySubComponent {...data} />
    </div>
  );
};

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: "getAuthCookie()",
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MyComponent />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
