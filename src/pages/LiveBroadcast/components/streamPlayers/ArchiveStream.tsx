import { type FC, useMemo, useState } from "react";
import StreamDisplay from "./StreamDisplay";

// FEATURE: Consider giving the user the options of `Grid` or `Series` archive layout [button, dropdown , switch]

// DOC_NOTES: Archive stream Content location - https://https://my.churchstreaming.tv/StreamingSettings/embed/

const ArchiveStream: FC = () => {
	const [view, _setView] = useState<"grid" | "series">("grid");

	const streamSrc = useMemo(
		() => `https://embeds.sermoncloud.com/new-york-united/sermons?view=${view}`,
		[view],
	);

	return (
		<StreamDisplay
			id="sermon-cloud-embed"
			title="Sermons Grid"
			src={streamSrc}
		/>
	);
};

export default ArchiveStream;
