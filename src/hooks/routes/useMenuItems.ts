import { useAuthentication } from "@hooks/auth";
import { useMemo } from "react";
import generalMenuItems, { restrictedMenuItems } from "./generalMenuItems";

const useMenuItems = () => {
	const { isAuthenticated } = useAuthentication();

	const userMenuItems = useMemo(() => {
		return isAuthenticated
			? [...generalMenuItems, ...restrictedMenuItems]
			: generalMenuItems;
	}, [isAuthenticated]);

	return { userMenuItems, generalMenuItems, restrictedMenuItems };
};

export default useMenuItems;
