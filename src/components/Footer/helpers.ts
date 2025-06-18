import dayjs from "dayjs";
import { WEBSITE_TITLE } from "../../constants/footer";

export const getCopyright = () =>
	`${dayjs().year()} ${WEBSITE_TITLE}. All rights reserved`;
