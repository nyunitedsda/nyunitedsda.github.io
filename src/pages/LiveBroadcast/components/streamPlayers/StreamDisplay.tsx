import { Flex } from "antd";
import { type FC, useEffect, useRef } from "react";
import type { StreamDisplayProps } from "./types";

const StreamDisplay: FC<
	StreamDisplayProps & React.IframeHTMLAttributes<HTMLIFrameElement>
> = (props) => {
	const { loading = "lazy", id, ...rest } = props;
	const ref = useRef(null);

	useEffect(() => {
		document?.getElementById("wrap")?.addEventListener("load", () => {
			document
				.getElementsByClassName(".playlist-wrap")[0]
				.setAttribute("style", "background: green !important");
		});
	});

	return (
		<Flex
			vertical
			id={`wrap-${id}`}
			style={{ flex: 1, minHeight: 'auto' }}
		>
			<iframe
				allow="fullscreen"
				allowFullScreen
				ref={ref}
				className="responsive-iframe iframe"
				id={id}
				width="100%"
				sandbox="allow-scripts"
				style={{ 
					flex: 1, 
					border: 0, 
				
				}}
				{...(rest as React.IframeHTMLAttributes<HTMLIFrameElement>)}
			></iframe>
		</Flex>
	);
};

export default StreamDisplay;
