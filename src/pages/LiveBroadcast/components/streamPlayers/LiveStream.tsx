import { type FC, useMemo } from "react";
import useColorTheme from "../../../../hooks/theme/useColorTheme";
import StreamDisplay from "./StreamDisplay";

// DOC_NOTES: Live stream Content location - https://https://my.churchstreaming.tv/StreamingSettings/embed/

const LiveStream: FC = () => {
	const { mode } = useColorTheme();

	const streamSrc = useMemo(
		() =>
			`https://embeds.sermoncloud.com/new-york-united/live?theme=${mode === "dark" ? mode : "light"}`,
		[mode],
	);

	return (
		<StreamDisplay
			id="sermon-cloud-embed"
			src={streamSrc}
			title="Live Broadcast Stream"
		/>
	);
};

export default LiveStream;
