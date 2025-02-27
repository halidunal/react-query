import { useMutation, useQuery } from 'react-query'
import './App.css'

function App() {
  const postQuery = useQuery(["posts"], () => {
    return fetch("https://jsonplaceholder.org/posts").then(res => res.json())
  }, {
    enabled: false
  })

  const mutateQuery = useMutation(["users"], (newPost) => {
    return fetch("https://jsonplaceholder.org/users", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(res => res.json())

  })

  const { data, isLoading, refetch } = postQuery;

  if (isLoading) {
    return (<>Looading...</>)
  }

  console.log(mutateQuery.data)
  return (
    <>
      <button onClick={refetch}>Fetch Posts</button>
      <button onClick={() => mutateQuery.mutate({ title: "test-title", body: "test-body", userId: 1 })}>Add Record</button>
      <button onClick={() => mutateQuery.reset()}>Remove Record</button>
      {
        data?.map((item, index) => (
          <div key={index}>{item.title}</div>
        ))
      }
    </>
  )
}

export default App
