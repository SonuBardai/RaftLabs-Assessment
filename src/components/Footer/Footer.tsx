import "./footer.css";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { DiReact, DiCss3, DiJavascript1 } from "react-icons/di";
import { SiGmail, SiTypescript, SiBootstrap } from "react-icons/si";

const Footer = () => {
    return (
        <>
            <div className="footerContainer">
                <div style={{ textAlign: "center" }}>Links to my stuff</div>
                <div className="contactIconContainer">
                    <a
                        href="https://www.linkedin.com/in/sonu-bardai/"
                        target="_blank"
                    >
                        <BsLinkedin className="contactIcons" />
                    </a>
                    <a href="https://github.com/SonuBardai" target="_blank">
                        <BsGithub className="contactIcons" />
                    </a>
                    <a href="mailto:sonubardai9@gmail.com" target="_blank">
                        <SiGmail className="contactIcons" />
                    </a>
                </div>
                <div className="footerMadeWith">
                    Developed using ReactJS <DiReact className="footerIcon" />,
                    React-Bootstrap UI Library{" "}
                    <SiBootstrap className="footerIcon" />, TypeScript{" "}
                    <SiTypescript className="footerIcon" />, Vanilla CSS{" "}
                    <DiCss3 className="footerIcon" />
                </div>
                <div className="footerText">
                    <a
                        href=""
                        target="_blank"
                        style={{ textAlign: "center" }}
                        className="footerText"
                    >
                        Link to the Code for this Project
                    </a>
                </div>
                <div className="footerText">
                    Designed & Coded by Sonu Bardai
                </div>
            </div>
        </>
    );
};

export default Footer;
