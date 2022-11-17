import { useState } from 'react'

function NameList ({names}) {
  const [list, setList] = useState(names)
  const [name, setName] = useState("")

  const onAddName = () => {
    // list.push(name)
    setList([...list, name])
    setName("")
  }

  return (
    <div className="">
      <ul>
        {list.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
      <button onClick={onAddName}> Add Name</button>
    </div>
  )
}

function Counter({ initialValue }) {
  const [count, setCount] = useState(initialValue)
  // console.log(props.initialValue)
  console.log(count)

  const addOne = () => {
    setCount(count + 1)
  }

  return (
    <div className="App">
      <button onClick={addOne}>Count = {count}</button>
    </div>
  )
}

function App () {
  const config = {
    counterInitial: 5,
    nameListArr: ["Jack", "Jill", "John"]
  }

  return (
    <div className="">
      <Counter initialValue={config.counterInitial} />
      <NameList names={config.nameListArr} />
    </div>
  )
}
export default App
