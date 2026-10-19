import { type FC, useEffect, useRef } from "react";
import type { StreamDisplayProps } from "./types";
import { Flex } from "antd";

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
		<Flex
			vertical
			id={`wrap-${id}`}
			// sx={rootSx}
			// className="responsive-iframe"
			// {...stackProps}
			style={{ backgroundColor: 'red', flex: 1,  minHeight: 0}}
		> 
			 <iframe
				 allow="fullscreen"
				 allowFullScreen
				 ref={ref}
				 className="responsive-iframe iframe"
				 id={id}
				 width="100%"
				//  height="100vh"
				 sandbox="allow-scripts"
				 style={{ flex: 1, border: 0}}
				//  loading={loading}
				 {...(rest as React.IframeHTMLAttributes<HTMLIFrameElement>)}
			 ></iframe>
		</Flex>
	);
};

export default StreamDisplay;
