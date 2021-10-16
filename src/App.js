import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

function RandomCoffee() {
  const randomCoffee = useQuery("coffee", async () => {
    const { data } = await axios.get(
      "https://random-data-api.com/api/coffee/random_coffee"
    );
    return data;
  });
  return (
    <>
      {randomCoffee.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{randomCoffee.data.variety}</h1>
          <button onClick={() => queryClient.invalidateQueries("coffee")}>
            Get Fresh Coffee
          </button>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RandomCoffee />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
