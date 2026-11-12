

function Square({value, onSquareClick}: {value:string | null , onSquareClick:()=>void}) {
     
  return( <button className="Square" onClick={onSquareClick}> {value}</button>
    );
}
export default Square;