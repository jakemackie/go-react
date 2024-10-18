import useSWR from "swr"
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
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div className="mx-auto w-full max-w-xl flex gap-8">
        <div className="w-1/2 max-h-md">
          <AddTodo mutate={mutate} />
        </div>
        <div className="w-1/2 max-h-56 overflow-y-scroll">
          <ul className="w-full py-4 px-3 rounded-lg flex flex-col gap-4 bg-gray-50 shadow-lg">
            {data?.map((todo) => (
              <li key={todo.id} className="flex flex-col gap-2 bg-green-500 text-white p-4 rounded-xl">
                <h2 className="text-lg font-bold">{todo.title}</h2>
                <p>{todo.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
