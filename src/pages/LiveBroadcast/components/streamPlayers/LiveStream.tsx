import { type FC, useMemo } from "react";
import useColorTheme from "../../../../hooks/theme/useColorTheme";
import StreamDisplay from "./StreamDisplay";

// DOC_NOTES: Live stream Content location - https://https://my.churchstreaming.tv/StreamingSettings/embed/

const LiveStream: FC = () => {
	const { mode } = useColorTheme();

	const streamSrc = useMemo(
		() =>
			mode === "dark" ? "https://embeds.sermoncloud.com/new-york-united/live?theme=dark" : "https://embeds.sermoncloud.com/new-york-united/live?theme=light"
		, [mode],
	);
	console.log(' streamSrc: ', streamSrc);

	return (
		<StreamDisplay
			id="sermon-cloud-embed"
			src={"https://embeds.sermoncloud.com/new-york-united/live?theme=dark"}
			title="Live Broadcast Stream"
		/>
	);
};

export default LiveStream;
