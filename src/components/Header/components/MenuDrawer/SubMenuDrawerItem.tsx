import {
	MenuDrawerItem,
	type SubMenuDrawerItemProps,
} from "@components/Header";
import ExpandLessRounded from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import { type FC, type MouseEvent, useCallback, useState } from "react";

const SubMenuDrawerItem: FC<SubMenuDrawerItemProps> = ({
	name,
	isActiveChild,
	isActiveParent,
	icon,
	children,
	onClick,
}) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(isActiveParent);

	const handleMenuExpanded = useCallback((e?: MouseEvent) => {
		e?.stopPropagation();
		setIsExpanded((d) => !d);
	}, []);

	return (
		<>
			<MenuDrawerItem
				aria-expanded={isExpanded}
				aria-controls={`${name}-submenu`}
				expandedIcon={
					isExpanded ? <ExpandLessRounded /> : <ExpandMoreRounded />
				}
				icon={icon}
				isActive={!isExpanded && isActiveParent}
				key={name}
				onClick={handleMenuExpanded}
				text={name}
			/>
			{isExpanded && (
				<div id={`${name}-submenu`}>
					{children?.map((ch) => (
						<MenuDrawerItem
							key={ch.name}
							isActive={isActiveChild(ch.path)}
							onClick={() => onClick(ch.path)}
							text={ch.name}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default SubMenuDrawerItem;
