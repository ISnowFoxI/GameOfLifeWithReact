import React,{useMemo,useState,useEffect} from 'react'
import './gameGrid.css'
import GridItem from './GridItem'
import _ from 'lodash'

let timeoutId= null
const isAlive= (x, y,grid)=>
  {
    if (x < 0 || x >= grid.length || y < 0 || y >= grid[x].length){
      return 0;
    }
   
        return grid[x][y].isAlive
  }

const checkCells = (grid)=> { 
  let gridLayout =_.cloneDeep(grid)
      for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y <grid[x].length; y++) {
          let numAlive = isAlive(x - 1, y - 1,grid) + isAlive(x, y - 1,grid) + isAlive(x + 1, y - 1,grid) + isAlive(x - 1, y,grid) + isAlive(x + 1, y,grid) + isAlive(x - 1, y + 1,grid) + isAlive(x, y + 1,grid) + isAlive(x + 1, y + 1,grid);
          let centerIndex = grid[x][y]
          let toBeChanged = gridLayout[x][y];
          if ((numAlive === 2||numAlive === 3) && centerIndex.isAlive===1){
              toBeChanged.isAlive = 1;
          }
          else if (numAlive===3 && centerIndex.isAlive===0) { 
            toBeChanged.isAlive = 1;
          }
          else if ((numAlive<=1 || numAlive>=4)){
              toBeChanged.isAlive = 0;
          }
        }
      }
return gridLayout

}


const GameGrid = ({gameSize}) => {
  const array = useMemo(()=> Array.from({length: gameSize}).map(() => Array(gameSize).fill(0)),[gameSize])
    const [grid,setGrid] = useState([])
    const changeState= (indexOne,indexTwo)=> { 
      setGrid((prevState)=> {
        let grid = [...prevState]
        grid[indexOne][indexTwo].isAlive=1;
        return grid
      })
    }

    
    const start=  (grid)=> { 
      let newGrid = _.cloneDeep(checkCells(grid))
      setGrid(newGrid)

      clearTimeout(timeoutId)
     timeoutId = setTimeout(()=> { 
        start(newGrid)
      },250)
    
  }

const stop = ()=> { 
  clearInterval(timeoutId)
}

const reset = ()=> { 
  clearInterval(timeoutId)
  setGrid(array.map(item=>item.map(state=> ({isAlive:state}))))
}

useEffect(() => {
  let _mounted = true;
  if(_mounted) setGrid(array.map(item=>item.map(state=> ({isAlive:state}))))
  return ()=> _mounted = false
}, [JSON.stringify(array)])


  return (
    <>
    <div className="header">
    <button type='button' className={"btn"} onClick={()=> start(grid)}>Start</button>
    <button type='button' className={"btn"} onClick={()=> stop()}>Stop</button>
    <button type='button' className={"btn"} onClick={()=> reset()}>Reset</button>
    </div>

   { grid.map((item,indexOne)=> 
    <div key={indexOne} className='gridRow'>
        {item.map((item,indexTwo)=> <GridItem 
        
        key={`${Math.random()+indexTwo}`} isAlive={item.isAlive}
        indexOne={indexOne}
        indexTwo={indexTwo}
        changeState={changeState}
        />
        
        )}
    </div>)}
    </>

  )
}

export default GameGrid