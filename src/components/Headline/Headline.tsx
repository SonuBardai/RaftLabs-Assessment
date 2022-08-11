import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./headline.css";

function Headline() {
    return (
        <Navbar expand="lg" className="navContainer py-3">
            <Container>
                <Link to="/" className="p-1">
                    <AiFillHome className="homeIcon" />
                </Link>
                <div className="headLineText">
                    <span>RaftLabs</span>
                    <img
                        src={process.env.PUBLIC_URL + "/raftlabs.png"}
                        alt="raftlabs"
                        style={{ width: "36px", height: "36px" }}
                    />
                    <span>Assessment solutions submitted by</span>
                    <a
                        className="sonuB"
                        target="_blank"
                        href="https://sonubardai-portfolio.web.app/"
                    >
                        Sonu Bardai
                        <img
                            src={process.env.PUBLIC_URL + "/click.gif"}
                            style={{ width: "42px", height: "42px", marginLeft: "8px" }}
                        />
                    </a>
                </div>
            </Container>
        </Navbar>
    );
}

export default Headline;
