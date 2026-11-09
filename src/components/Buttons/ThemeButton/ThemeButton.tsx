import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import { type FC, type MouseEvent, useCallback, useContext } from "react";
import context from "@/contexts/ThemeContext/context";

const ThemeButton: FC<{ expanded?: boolean }> = ({ expanded = false }) => {
	const { mode, toggleMode } = useContext(context);
	const { token } = theme.useToken();

	const _handleBtnClick = useCallback<
		(e: MouseEvent<HTMLButtonElement>) => void
	>(
		(e) => {
			e.stopPropagation();
			toggleMode();
		},
		[toggleMode],
	);

	if (!mode) {
		return null;
	}

	return (
		<Button
			onClick={_handleBtnClick}
			type="text"
			title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
			style={{
				...(expanded
					? {
							width: "100%",
							justifyContent: "flex-start",
							height: 40,
							paddingLeft: 20,
						}
					: {}),
			}}
			icon={
				mode === "dark" ? (
					<SunOutlined
						style={{ color: token.colorWarning, fontSize: "24px" }}
					/>
				) : (
					<MoonOutlined
						style={{
							color: token.colorPrimary,
							fontSize: "24px",
						}}
					/>
				)
			}
		>
			{expanded ? `${"Theme"}` : undefined}
		</Button>
	);
};

export default ThemeButton;
