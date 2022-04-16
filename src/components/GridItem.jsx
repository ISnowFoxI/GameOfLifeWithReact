const GridItem = ({isAlive,indexOne,indexTwo,changeState})=> { 
    return <div className={`gridItem ${isAlive? "selected" : ""}`} onClick={()=>{
      changeState(indexOne,indexTwo)
    }} >
    </div>
}

export default GridItem