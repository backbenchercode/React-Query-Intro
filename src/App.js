import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

function Gitusers() {
  const gitUsers = useQuery("gitusers", async () => {
    const { data } = await axios.get(
      "https://api.github.com/search/users?q=react"
    );
    return data;
  });
  console.log(gitUsers);
  return (
    <div>
      <h1>{gitUsers.data?.total_count} results found!</h1>
      <ul>
        {gitUsers.data?.items.map((item) => (
          <li key={item.id}>
            <img src={item.avatar_url} width="60px" height="60px" />@
            {item.login}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Gitusers />
    </QueryClientProvider>
  );
}

export default App;
