import './Piece.css'


interface PieceProps {
    piece: string;
    onClick?: () => void;
  }

export default function Piece({ piece,onClick}: PieceProps):JSX.Element | null {
    if(piece===' '||piece===""){
        return null
    }
    const isWhite=piece===piece.toUpperCase();
    const color= isWhite ? 'w':'b';
    const imgName=piece.toLowerCase()
    const imgsrc=require(`../assets/${color}/${imgName}.png`)
    return <div style={{backgroundImage:`url(${imgsrc})`}} className='chess-piece' onClick={onClick}></div>
    
}