import useSWR from "swr"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AddTodo from "./components/addTodo"

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  body: string;
}

export const endpoint = "http://localhost:4000"

const fetcher = (url: string) => fetch(`${endpoint}/${url}`).then((res) => res.json())

function App() {

  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher)

  return (
    <div className="mx-auto min-h-screen max-w-lg flex flex-col justify-center items-center px-4 lg:px-0 gap-12">

      <div className="w-full flex flex-col gap-4">
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
          Any entries added are only stored in memory and will be lost when the server is restarted.
          </AlertDescription>
        </Alert>
        <AddTodo mutate={mutate} />
      </div>
      
      {data && data.length > 0 && (
      <div className="w-full lg:fixed lg:bottom-4 lg:right-4 lg:w-80 space-y-4">
        <h2 className="text-2xl">API Data</h2>
        <ul className="max-h-56 w-full overflow-y-scroll flex flex-col p-4 bg-zinc-900 rounded-2xl ring-4 ring-zinc-800">
        {data.map((todo) => (
          <li key={todo.id}>
        <pre>{JSON.stringify(todo, null, 2)}</pre>
          </li>
        ))}
        </ul>
      </div>
      )}

    </div>
  )
}

export default App
