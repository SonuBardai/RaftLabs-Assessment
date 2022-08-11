import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
    return (
        <>
            <div className="homeContainer">
                <Link to={"/assessment-1"} className="fadeLeft">
                    <div className="layer">
                        <div className="assessmentHead assessmentHead-1">
                            <h1>Assessment-1</h1>
                            <div>
                                Find the degree of separation between any two
                                people.
                            </div>
                        </div>
                    </div>
                    <img
                        src={process.env.PUBLIC_URL + "/friendBG-1.jpg"}
                        alt="friendsBG"
                        className="bgImg"
                    />
                </Link>
                <Link to={"/assessment-2"} className="fadeRight">
                    <div className="layer">
                        <div className="assessmentHead assessmentHead-2">
                            <h1>Assessment-2</h1>
                            <div>Simulate the movement of a Chess Knight.</div>
                        </div>
                    </div>
                    <img
                        src={process.env.PUBLIC_URL + "/knightBG-1.jpg"}
                        alt="friendsBG"
                        className="bgImg"
                    />
                </Link>
            </div>
        </>
    );
};
export default Home;
