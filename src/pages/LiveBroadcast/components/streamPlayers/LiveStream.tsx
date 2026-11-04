import { type FC, useContext, useId, useMemo } from "react";
import context from "@/contexts/ThemeContext/context";
import StreamDisplay from "./StreamDisplay";

// DOC_NOTES: Live stream Content location - https://https://my.churchstreaming.tv/StreamingSettings/embed/
const STREAM_URL = "https://embeds.sermoncloud.com/new-york-united/live?theme=";

const LiveStream: FC = () => {
	const { mode } = useContext(context);
	const uId = useId();

	const streamSrc = useMemo(
		() => `${STREAM_URL}${mode === "dark" ? "dark" : "light"}`,
		[mode],
	);

	return (
		<StreamDisplay
			id={`${uId}-embeds`}
			src={streamSrc}
			title="Live Broadcast Stream"
		/>
	);
};

export default LiveStream;
