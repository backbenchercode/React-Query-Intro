import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

function GitUserSearch() {
  const [userValue, setUserValue] = useState("");

  const gitUsers = useQuery(["User", userValue], async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await axios.get(
      "https://api.github.com/search/users?q=" + userValue
    );
    return data;
  });

  const [repoValue, setRepoValue] = useState("");

  const gitRepos = useQuery(["Repo", repoValue], async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await axios.get(
      "https://api.github.com/search/repositories?q=" + repoValue
    );
    return data;
  });
  return (
    <>
      <input type="text" onChange={(e) => setUserValue(e.target.value)} />
      <h1>{gitUsers.data?.total_count} user results found!</h1>
      <input type="text" onChange={(e) => setRepoValue(e.target.value)} />
      <h1>{gitRepos.data?.total_count} repo results found!</h1>
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
