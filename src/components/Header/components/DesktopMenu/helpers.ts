import type { RouteMenu } from "../../../../hooks/routes/types";

const btnCharLength = 12;
const btnXPadding = 16;
// Theme and login button width 126
const themeLoginWidth = 126;
const optionBtnWidth = 48; // Width of the "More" button

const getBtnWidth = (name: string): number =>
	name.length * btnCharLength + btnXPadding * 2;

const generateMenuDisplay = (width: number, menuList: RouteMenu[]) => {
	const menuItemsBtnSizes = menuList.map((item) => getBtnWidth(item.name));
	let count = 0;
	let calWidth = 0;
	for (let x = 0; x < menuItemsBtnSizes.length; x += 1) {
		if (
			calWidth + themeLoginWidth + menuItemsBtnSizes[x] > width ||
			calWidth + optionBtnWidth + menuItemsBtnSizes[x] > width
		) {
			break;
		}
		count += 1;
		calWidth += menuItemsBtnSizes[x];
	}
	return {
		displayList: menuList.slice(0, count),
		optionList: menuList.length > count ? menuList.slice(count) : [],
	};
};

export { generateMenuDisplay, getBtnWidth };
