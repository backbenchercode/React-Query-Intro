import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

function GitUserSearch() {
  const [value, setValue] = useState("");

  const gitUsers = useQuery(`user${value}`, async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await axios.get(
      "https://api.github.com/search/users?q=" + value
    );
    return data;
  });
  console.log(gitUsers);
  return (
    <>
      <input type="text" onChange={(e) => setValue(e.target.value)} />
      <h1>{gitUsers.data?.total_count} results found!</h1>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GitUserSearch />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
