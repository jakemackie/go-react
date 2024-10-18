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
    <div className="mx-auto min-h-screen max-w-sm flex flex-col justify-center items-center gap-4">

      <div className="w-full">
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Any entries added are only stored in memory and will be lost when the server is restarted.
          </AlertDescription>
        </Alert>
      </div>

      <div className="w-full">
        <AddTodo mutate={mutate} />
      </div>
      
      {data && data.length > 0 && (
      <div className="fixed bottom-0 right-0 m-4 max-h-56 w-80 overflow-y-scroll rounded-2xl ring-4 ring-zinc-800">
          <ul className="w-full p-4 flex flex-col bg-zinc-900 ">
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
