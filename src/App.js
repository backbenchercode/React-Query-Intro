import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

function useGitusers() {
  return useQuery("gitusers", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await axios.get(
      "https://api.github.com/search/users?q=react"
    );
    return data;
  });
}

function Gitusers() {
  const gitUsers = useGitusers();
  console.log(gitUsers);
  return (
    <>
      {gitUsers.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{gitUsers.data.total_count} results found!</h1>
        </div>
      )}
    </>
  );
}
function AnotherGitusers() {
  const gitUsers = useGitusers();
  console.log(gitUsers);
  return (
    <>
      {gitUsers.isLoading ? (
        <h1>Another Loading...</h1>
      ) : (
        <div>
          <h1>Another {gitUsers.data.total_count} results found!</h1>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Gitusers />
      <AnotherGitusers />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
