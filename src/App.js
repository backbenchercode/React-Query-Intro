import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

function Gitusers() {
  const gitUsers = useQuery("gitusers", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await axios.get(
      "https://api.github.com/search/users?q=react"
    );
    return data;
  });
  console.log(gitUsers);
  return (
    <>
      {gitUsers.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{gitUsers.data.total_count} results found!</h1>
          <ul>
            {gitUsers.data.items.map((item) => (
              <li key={item.id}>
                <img src={item.avatar_url} width="60px" height="60px" />@
                {item.login}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function Gitrepos() {
  const gitRepos = useQuery("gitrepos", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await axios.get(
      "https://api.github.com/search/repositories?q=react"
    );
    return data;
  });
  console.log(gitRepos);
  return (
    <>
      {gitRepos.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{gitRepos.data.total_count} results found!</h1>
          <ul>
            {gitRepos.data.items.map((item) => (
              <li key={item.id}>
                {item.name} - @{item.owner.login}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Gitusers />
      <Gitrepos />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
