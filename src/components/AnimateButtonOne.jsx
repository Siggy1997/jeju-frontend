import "./AnimateButtonOne.css";

function AnimateButtonOne({onClick, text}) {
    return (
        <div style={{ marginTop: '7%',height:"13%",  display:'flex', justifyContent:'center',alignItems:"center", width:'100%'}}> 
            <button onClick={onClick} className="momo-trust-display-regular ani-btn-one ">{text}
            </button>
        </div>
    );
}
export default AnimateButtonOne;