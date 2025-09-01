import type { DatabaseEntity } from "@/api";
import { useAuthentication } from "@hooks/auth";
import { useCallback, useMemo } from "react";

const usePermission = (entity: DatabaseEntity) => {
	const { user } = useAuthentication();

	const { canCreate, canEdit, canDelete, canView } = useMemo(() => {
		if (!user?.permissions) {
			return {
				canCreate: false,
				canEdit: false,
				canDelete: false,
				canView: false,
			};
		}
		const permissions = user?.permissions;
		return {
			canEdit:
				permissions?.includes(`${entity}-update`) ||
				permissions?.includes(`${entity}-manage`),
			canCreate:
				permissions?.includes(`${entity}-create`) ||
				permissions?.includes(`${entity}-manage`),
			canDelete:
				permissions?.includes(`${entity}-delete`) ||
				permissions?.includes(`${entity}-manage`),
			canView:
				permissions?.includes(`${entity}-read`) ||
				permissions?.includes(`${entity}-manage`),
		};
	}, [user, entity]);

	const hasPermission = useCallback(
		(action: "create" | "edit" | "delete" | "view") => {
			switch (action) {
				case "create":
					return canCreate;
				case "edit":
					return canEdit;
				case "delete":
					return canDelete;
				case "view":
					return canView;
				default:
					return false;
			}
		},
		[canCreate, canEdit, canDelete, canView],
	);

	return {
		canEdit,
		canCreate,
		canDelete,
		canView,
		hasPermission,
	};
};

export default usePermission;
