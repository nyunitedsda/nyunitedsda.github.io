import { type FC, memo } from "react";

const strokeWidth = 12;

const YoutubeIcon: FC = () => {
	return (
		<svg
			height="24"
			width="32"
			viewBox="0 0 200 140"
			fill="none"
			aria-label="Youtube icon"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			style={{ display: "inline-block", verticalAlign: "middle", height: 24 }}
		>
			{/* YouTube rounded rectangle outline */}
			<rect
				x="12"
				y="22"
				width="176"
				height="96"
				rx="18"
				ry="18"
				fill="none"
				stroke="#FF0000"
				strokeWidth={strokeWidth}
			/>
			{/* Play button triangle outline */}
			<path
				d="M75 45L75 95L125 70L75 45Z"
				fill="none"
				stroke="#FF0000"
				strokeWidth={strokeWidth}
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default memo(YoutubeIcon);
