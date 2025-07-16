import { MoreVertOutlined } from "@mui/icons-material";
import { IconButton, Menu, Stack, Typography } from "@mui/material";
import { type FC, useCallback, useRef, useState } from "react";
import ProjectCard from "../../../ProjectCard/ProjectCard";
import type { GenericType } from "../../types";
import TableAction from "../TableAction/TableAction";
import type { TableCardProps } from "./types";

const TableCard: FC<TableCardProps<GenericType>> = ({
	data,
	columns,
	onDelete,
	onEdit,
	onView,
	renderAction,
}) => {
	const [showActions, setShowActions] = useState<boolean>(false);
	const actionButtonRef = useRef<HTMLButtonElement>(null);

	const _handleActionClick = useCallback(() => {
		setShowActions((prev) => !prev);
	}, []);

	return (
		<>
			<ProjectCard
				header={{
					title: "",
					action:
						onEdit || onDelete || onView ? (
							<IconButton
								ref={actionButtonRef}
								color="primary"
								aria-label="actions"
								size="small"
								onClick={_handleActionClick}
							>
								<MoreVertOutlined fontSize="small" />
							</IconButton>
						) : null,
				}}
				content={
					<Stack direction="column">
						{columns.map((col) => (
							<Stack
								key={col.field}
								direction="row"
								alignItems="center"
								justifyContent={"flex-start"}
								spacing={1}
							>
								{col.renderHeader ? (
									col.renderHeader
								) : (
									<Typography fontWeight={"bold"}>
										{col.header ?? col.title}:
									</Typography>
								)}
								{col.renderCell ? (
									col.renderCell(data)
								) : (
									<Typography>
										{data[col.field as keyof typeof data]}
									</Typography>
								)}
							</Stack>
						))}
					</Stack>
				}
			/>
			{showActions && (
				<Menu
					anchorEl={actionButtonRef.current}
					open={showActions}
					onClose={() => setShowActions(false)}
					onClick={(e) => {
						e.stopPropagation();
						setShowActions(false);
					}}
				>
					<TableAction
						data={data}
						{...{ onEdit, onDelete, onView, renderAction }}
					/>
				</Menu>
			)}
		</>
	);
};

export default TableCard;
