import Lanyard from "@/components/Lanyard";
import React from "react";
import FadeIn from "@/components/FadeIn";
import "./About.scss";
import manifest from "./manifest.json";

const About = React.memo(() => {
	return (
		<FadeIn>
			<div className="about__container">
				<p>
					Hi! 👋 I am{" "}
					<a
						title="GitHub"
						href="https://github.com/kyrie25"
						target="_blank"
						rel="noopener noreferrer"
					>
						kyrie25
					</a>
					, a student studying somewhere in 🇻🇳. Writes stuff in my free time,
					mostly in TypeScript, can vary depending on what my project requires.
					Navigate the tabs to see what I am up to.
				</p>
				<p>My tech stack:</p>
				<div className="icons__wrapper">
					{manifest.languages.map((value, index) => {
						return (
							<a
								href={value.url}
								key={index}
								id={value.name}
								target="_blank"
								rel="noopener noreferrer"
							>
								<img title={value.name} src={value.image}></img>
							</a>
						);
					})}
				</div>
				<p>Projects I'm working on/have had experience in:</p>
				<div className="icons__wrapper">
					{manifest.projects.map((value, index) => {
						return (
							<a
								href={value.url}
								key={index}
								id={value.name}
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									title={value.name}
									src={value.image}
									alt={value.name}
								></img>
							</a>
						);
					})}
				</div>
				<Lanyard />
			</div>
		</FadeIn>
	);
});
export default About;