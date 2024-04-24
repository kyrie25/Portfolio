import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

import "./index.scss";
import "react-tooltip/dist/react-tooltip.css";

import { Lanyard } from "./Lanyard";

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

export const waitTwoFrames = (callback) => requestAnimationFrame(() => requestAnimationFrame(callback));

export const Anchor = ({ href, children, ...props }) => (
	<a href={href} target="_blank" rel="noreferrer" {...props}>
		{children}
	</a>
);

const LoadingIcon = () => {
	return (
		<svg width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" strokeWidth="2">
				<animate
					attributeName="r"
					repeatCount="indefinite"
					dur="1s"
					values="0;40"
					keyTimes="0;1"
					keySplines="0 0.2 0.8 1"
					calcMode="spline"
					begin="0s"
				/>
				<animate
					attributeName="opacity"
					repeatCount="indefinite"
					dur="1s"
					values="1;0"
					keyTimes="0;1"
					keySplines="0.2 0 0.8 1"
					calcMode="spline"
					begin="0s"
				/>
			</circle>
			<circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" strokeWidth="2">
				<animate
					attributeName="r"
					repeatCount="indefinite"
					dur="1s"
					values="0;40"
					keyTimes="0;1"
					keySplines="0 0.2 0.8 1"
					calcMode="spline"
					begin="-0.5s"
				/>
				<animate
					attributeName="opacity"
					repeatCount="indefinite"
					dur="1s"
					values="1;0"
					keyTimes="0;1"
					keySplines="0.2 0 0.8 1"
					calcMode="spline"
					begin="-0.5s"
				/>
			</circle>
		</svg>
	);
};

const App: React.FC = () => {
	const [data, setData] = React.useState<Record<string, any>>({});
	const [fetching, setFetching] = React.useState(true);
	const [avatarLoaded, setAvatarLoaded] = React.useState(false);
	const [bannerLoaded, setBannerLoaded] = React.useState(false);
	const [lanyardLoaded, setLanyardLoaded] = React.useState(false);

	useEffect(() => {
		fetch(`https://api.kyrie25.me/discord/${DISCORD_ID}`)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch(() => setData({}));
	}, []);

	useEffect(() => {
		setFetching(false);
		setAvatarLoaded(!data.avatar);
		setBannerLoaded(!data.banner);
	}, [data]);

	const ext = (hash: string | null) => (hash?.startsWith("a_") ? "gif" : "webp");

	const avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.${ext(data.avatar)}?size=256`;
	const banner = `url(https://cdn.discordapp.com/banners/${data.id}/${data.banner}.${ext(data.banner)}?size=2048)`;

	return (
		<>
			<main>
				<Tooltip
					id="tooltip"
					style={{
						zIndex: 9999999,
					}}
				/>
				{(fetching || !avatarLoaded || !bannerLoaded || !lanyardLoaded) && (
					<div className="loading">
						<LoadingIcon />
					</div>
				)}
				<section>
					<header>
						{data.banner && (
							<div className="banner" style={{ backgroundImage: banner }}>
								<img src={banner} alt="Kyrie25" onLoad={() => waitTwoFrames(() => setBannerLoaded(true))} />
							</div>
						)}
						<div className="avatar">
							{data.avatar && <img src={avatar} alt="Kyrie25" onLoad={() => waitTwoFrames(() => setAvatarLoaded(true))} />}
							<div className="name">
								<h1>Kyrie</h1>
								<span>@kyrie25</span>
							</div>
						</div>
					</header>

					<Lanyard id={DISCORD_ID} loaded={setLanyardLoaded} />

					<article>
						<h3>
							Junior full-stack developer, CS undergraduate at fit@<Anchor href="https://en.hcmus.edu.vn/">hcmus</Anchor>
						</h3>
					</article>

					<article>
						<p>Absolute Granblue nerd</p>
					</article>

					<article>
						<object
							data="https://github-readme-stats.vercel.app/api?username=kyrie25&include_all_commits=true&show_icons=true&count_private=true&custom_title=Kyrie%27s+GitHub+Stats&theme=react&border_color=1d2a38&bg_color=1d2a38"
							type="image/svg+xml"
						/>
					</article>

					<article>
						<h3>Contact me via:</h3>
						<div className="icons">
							<Anchor href="mailto:contact@kyrie25.me" title="Mail">
								<FontAwesomeIcon icon={faEnvelope} size="1x" />
							</Anchor>
							<Anchor href={`https://discord.com/users/${data.id}`} title="Discord">
								<FontAwesomeIcon icon={faDiscord} size="1x" />
							</Anchor>
							<Anchor href="https://twitter.com/_kyrie_25" title="Twitter">
								<FontAwesomeIcon icon={faTwitter} size="1x" />
							</Anchor>
							<Anchor href="https://github.com/kyrie25" title="GitHub">
								<FontAwesomeIcon icon={faGithub} size="1x" />
							</Anchor>
						</div>
					</article>
				</section>
			</main>
			<Analytics />
		</>
	);
};

createRoot(document.getElementById("root")!).render(<App />);
