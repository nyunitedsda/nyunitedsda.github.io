import type { FC } from "react";
import StreamDisplay from "./StreamDisplay";

// DOC_NOTES: Archive stream Content location - https://https://my.churchstreaming.tv/StreamingSettings/embed/
const STREAM_URL = "https://embeds.sermoncloud.com/new-york-united/sermons";

const ArchiveStream: FC = () => {
	return (
		<StreamDisplay
			id="sermon-cloud-embed"
			title="Sermons Grid"
			src={STREAM_URL}
		/>
	);
};

export default ArchiveStream;
