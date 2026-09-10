import { useState } from 'react'

export const Todo = () => {
    const[todos, setTodos] = useState([])
    const[input, setInput] = useState("")

    const handleAdd = () => {
        setTodos([... todos, input])
        setInput("")
    }

    return (
        <div>
            <h1>TO DO LIST</h1>

            <input value={input} 
            onChange={(e) => setInput (e.target.value)}/>

            <button onClick={handleAdd}>ADD</button>
        </div>
    )
}