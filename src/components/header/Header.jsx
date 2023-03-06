import "./header.css";


export default function Header() {
  return (
    <>
    <div className='header'>
      <img
        className="headerimg"
        src="./write.svg"
        alt=""
        />
        <div className="headtitle">  
        <span className="headertitlesm">Write something in our....&#9997;</span>
        <span className="headertitlelg">WeBlog</span>
        </div>
    </div>
        </>
  )
}
