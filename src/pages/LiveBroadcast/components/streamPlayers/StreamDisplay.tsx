import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { type FC, useEffect, useRef } from "react";
import type { StreamDisplayProps } from "./types";

const rootSx: SxProps<Theme> = {
	flexGrow: 1,
	height: "100%",
	minHeight: "-webkit-fill-available",
	position: "relative",
	backgroundColor: (theme) => `${theme.palette.background.paper} !important`,
	"& iframe": {
		border: 0,
		height: "auto",
		minHeight: "-webkit-fill-available",
		position: "absolute",
	},

	"& .responsive-iframe": {
		position: "relative",
		/*aspect ratio 16:9 */
		height: 0,
		overflow: "hidden",
	},
	".responsive-iframe iframe": {
		width: "100%",
		height: "100%",
		position: "absolute",
		left: 0,
		top: 0,
	},
};

const StreamDisplay: FC<
	StreamDisplayProps & React.IframeHTMLAttributes<HTMLIFrameElement>
> = (props) => {
	const { loading = "lazy", stackProps, id, ...rest } = props;
	const ref = useRef(null);

	useEffect(() => {
		document?.getElementById("wrap")?.addEventListener("load", () => {
			document
				.getElementsByClassName(".playlist-wrap")[0]
				.setAttribute("style", "background: green !important");
		});
	});

	return (
		<Stack
			id={`wrap-${id}`}
			sx={rootSx}
			className="responsive-iframe"
			{...stackProps}
		>
			<iframe
				allow="fullscreen"
				allowFullScreen
				ref={ref}
				className="responsive-iframe iframe"
				id={id}
				width="100%"
				height="100%"
				// sandbox="allow-scripts"
				loading={loading}
				{...(rest as React.IframeHTMLAttributes<HTMLIFrameElement>)}
			></iframe>
		</Stack>
	);
};

export default StreamDisplay;
