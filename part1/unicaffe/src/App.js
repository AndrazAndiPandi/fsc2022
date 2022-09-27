import { useState } from 'react'

const All = ({good,neutral,bad}) =>{
  return (good+neutral+bad)
}

const Average = ({good,neutral,bad}) =>{
  var avg = (good+((-1)*bad))/(good+neutral+bad)
  return avg
}

const Positive = ({good,neutral,bad}) =>{
  var pos = good/(good+neutral+bad)*100
  return pos
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  if((good+neutral+bad)>0){
    return (
      <div>
        <h1>Give feedback</h1>
        <button onClick={()=>{setGood(good+1)}}>good</button>
        <button onClick={()=>{setNeutral(neutral+1)}}>neutral</button>
        <button onClick={()=>{setBad(bad+1)}}>bad</button>
        <h1>Statistics</h1>
        <table>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td><All good={good} neutral={neutral} bad={bad}/></td>
          </tr>
          <tr>
            <td>average</td>
            <td><Average good={good} neutral={neutral} bad={bad}/></td>
          </tr>
          <tr>
            <td>positive</td>
            <td><Positive good={good} neutral={neutral} bad={bad}/>%</td>
          </tr>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Give feedback</h1>
        <button onClick={()=>{setGood(good+1)}}>good</button>
        <button onClick={()=>{setNeutral(neutral+1)}}>neutral</button>
        <button onClick={()=>{setBad(bad+1)}}>bad</button>
        <h1>Statistics</h1>
        <p>No feedback yet...</p>
      </div>
    )
  }
}

export default App
