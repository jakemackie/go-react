import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import { endpoint, Todo } from "@/App";
import { KeyedMutator } from "swr";
import { FormEvent } from "react";

function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
    async function createTodo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const values = {
            title: formData.get("title") as string,
            body: formData.get("body") as string
        };

        const updated = await fetch(`${endpoint}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(res => res.json());

        mutate(updated);
    }

    return (
        <form
            onSubmit={createTodo}
            className="w-full flex flex-col gap-4"
        >
            <Input name="title" placeholder="Title" required />
            <Textarea name="body" placeholder="Body" required />
            <Button type="submit" className="w-fit">Add</Button>
        </form>
    );
}

export default AddTodo;
