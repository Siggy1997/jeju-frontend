import "./Loading.css"

function Loading() {
    return (
        <div className="dl">
            <div className="dl__container">
                <div className="dl__corner--top"></div>
                <div className="dl__corner--bottom"></div>
            </div>
            <div className="dl__square"></div>
        </div>
    );
}

export default Loading;