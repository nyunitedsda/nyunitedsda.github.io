// import Stack from "@mui/material/Stack";
// import type { SxProps, Theme } from "@mui/material/styles";
import {
	// type MutationObserverInit,
	useMutationObserver,
} from "@reactuses/core";
import { type FC, useCallback, useEffect, useRef } from "react";
import type { StreamDisplayProps } from "./types";

// const rootSx: SxProps<Theme> = {
// 	flexGrow: 1,
// 	height: "100%",
// 	minHeight: "-webkit-fill-available",
// 	position: "relative",
// 	backgroundColor: (theme) => `${theme.palette.background.paper} !important`,
// 	"& iframe": {
// 		border: 0,
// 		height: "auto",
// 		minHeight: "-webkit-fill-available",
// 		position: "absolute",
// 	},
// 	"& .responsive-iframe": {
// 		/* aspect ratio 16:9 */
// 		height: "100%",
// 		overflow: "hidden",
// 	},
// 	".responsive-iframe iframe": {
// 		width: "100%",
// 		height: "100%",
// 		position: "absolute",
// 		left: 0,
// 		top: 0,
// 	},
// };

// Observe all DOM mutations inside the iframe body (subtree + childList + attributes)
const _mutationOption: MutationObserverInit = {
	attributes: true,
	childList: true,
	subtree: true,
};

const StreamDisplay: FC<
	StreamDisplayProps & React.IframeHTMLAttributes<HTMLIFrameElement>
> = (props) => {
	const { loading = "eager", stackProps, id, ...rest } = props;

	const iframeRef = useRef<HTMLIFrameElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	/**
	 * Reads the iframe's document scroll dimensions and applies them to the
	 * outer container so the Stack grows to fit the content exactly.
	 */

	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: false positive
	const adjustContainerToIframeContent = useCallback(() => {
		console.log("adjustContainerToIframeContent called");

		const iframe = iframeRef.current;
		const container = containerRef.current;
		const pageContainer = document.getElementById("page-container");

		console.log("iframe: ", iframe);

		if (!iframe || !container) return;

		try {
			const iframeDoc =
				iframe.contentDocument ?? iframe.contentWindow?.document;
			if (!iframeDoc) return;

			const scrollHeight =
				iframeDoc.documentElement?.scrollHeight ??
				iframeDoc.body?.scrollHeight ??
				0;

			const scrollWidth =
				iframeDoc.documentElement?.scrollWidth ??
				iframeDoc.body?.scrollWidth ??
				0;

			if (scrollHeight > 0) {
				if (pageContainer) {
					pageContainer.style.height = `${scrollHeight}px`;
					console.log("height: ", pageContainer.style.height);
				}
				container.style.height = `${scrollHeight}px`;
				iframe.style.height = `${scrollHeight}px`;
			}

			if (scrollWidth > 0) {
				container.style.width = `${scrollWidth}px`;
				iframe.style.width = `${scrollWidth}px`;
			}
		} catch {
			// Cross-origin iframes will throw a SecurityError – silently ignore.
		}
	}, []);

	/**
	 * MutationObserver callback: fired whenever a DOM change occurs inside the
	 * iframe. We re-measure scroll dimensions on every mutation so the container
	 * always matches the latest content size.
	 */
	const mutationCB: MutationCallback = useCallback(
		(mutationList) => {
			if (mutationList.length === 0) {
				console.log("Mutation List Length eq 0");
				return;
			}

			console.log(`Mutation List Length eq ${mutationList.length}`);
			adjustContainerToIframeContent();
		},
		[adjustContainerToIframeContent],
	);

	/**
	 * useMutationObserver from @reactuses/core targets the *iframe element* in
	 * the host document. To also observe mutations inside the iframe's own DOM
	 * we start a second observer on the iframe's body once it has loaded.
	 */
	useMutationObserver(mutationCB, iframeRef, _mutationOption);

	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe) return;

		let innerObserver: MutationObserver | null = null;

		const handleLoad = () => {
			// Initial size adjustment when the iframe first loads.
			adjustContainerToIframeContent();

			// Attach a MutationObserver directly to the iframe's inner document so
			// we catch any dynamic content changes (e.g. lazy-loaded images, scripts
			// that inject nodes after load, resize triggered by user interaction).
			try {
				const iframeDoc =
					iframe.contentDocument ?? iframe.contentWindow?.document;

				if (iframeDoc?.body) {
					innerObserver = new MutationObserver(() => {
						adjustContainerToIframeContent();
					});

					innerObserver.observe(iframeDoc.body, {
						attributes: true,
						childList: true,
						subtree: true,
					});
				}
			} catch {
				// Cross-origin – inner observer not possible, outer one still runs.
			}
		};

		iframe.addEventListener("load", handleLoad);

		return () => {
			iframe.removeEventListener("load", handleLoad);
			innerObserver?.disconnect();
		};
	}, [adjustContainerToIframeContent]);

	return (
		// <Stack
		// 	id={`wrap-${id}`}
		// 	sx={rootSx}
		// 	{...stackProps}
		// 	ref={containerRef}
		// >
		<iframe
			allow="fullscreen"
			allowFullScreen
			ref={iframeRef}
			className="responsive-iframe iframe"
			id={id}
			width="100%"
			height="100%"
			sandbox="allow-scripts allow-presentation"
			loading={loading}
			{...(rest as React.IframeHTMLAttributes<HTMLIFrameElement>)}
		/>
		// </Stack>
	);
};

export default StreamDisplay;
