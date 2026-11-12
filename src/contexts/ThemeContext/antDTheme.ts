import { type ConfigProviderProps, type ThemeConfig } from "antd";

const primaryColor = "#187cc2";

const COMMON_TOKEN: ThemeConfig["token"] = {
	colorPrimary: primaryColor,
	colorPrimaryText: "white",
	// fontFamily: "inter",
};

const LIGHT_TOKEN: ThemeConfig["token"] = {
	...COMMON_TOKEN,
};

const DARK_TOKEN: ThemeConfig["token"] = {
	...COMMON_TOKEN,
	colorBgLayout: "rgb(53, 67, 84)",
	colorBgContainer: "rgb(48, 55, 66)",
};

const antDTheme: ConfigProviderProps["theme"] = {
	components: {
		Layout: {
			footerBg: LIGHT_TOKEN.colorPrimary,
		},
		Carousel: {
			arrowSize: 24,
			dotHeight: 4,
		},
		Card: {
			headerBg: primaryColor,
			colorBorderSecondary: "transparent",
			colorBorder: "transparent",
			colorBorderBg: "transparent",
		},
		Spin: {
			colorPrimary: primaryColor,
		},
	},
};

export { antDTheme, DARK_TOKEN, LIGHT_TOKEN };
