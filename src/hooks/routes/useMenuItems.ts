import { useAuthentication } from "@hooks/auth";
import { menuList } from "@hooks/routes";
import { useMemo } from "react";

const useMenuItems = () => {
	const { isAuthenticated } = useAuthentication();

	const activeMenu = useMemo(() => {
		return isAuthenticated ? menuList.restrictedMenu : menuList.generalMenu;
	}, [isAuthenticated]);

	return { activeMenu };
};

export default useMenuItems;
