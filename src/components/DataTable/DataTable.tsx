import { lazy, Suspense, useMemo, useState, type FC, type ReactNode } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table, { type TableOwnProps } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { type TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { SxProps, Theme } from "@mui/material/styles";
import { generateActionColumn } from "./helpers/columnHelpers";
import type { ColumnDefinition, DataTableProps, GenericType } from "./types";

const DensitySmallOutlined = lazy(() => import("@mui/icons-material/DensitySmallOutlined"));
const DensityMediumOutlined = lazy(() => import("@mui/icons-material/DensityMediumOutlined"));

const rootSx: SxProps<Theme> = {
	bgcolor: "background.paper",
	borderRadius: 1,
	boxShadow: 1,
	overflow: "hidden",
	display: { xs: "none", md: "block" },
	"& .MuiTableHead-root": {
		bgcolor: "primary.main",
		"& .MuiTableCell-root": {
			color: "primary.contrastText",
			fontWeight: "bold",
		},
	},
};

const defaultAlign = "left" as TableCellProps["align"];

const DataTable: FC<DataTableProps<GenericType>> = (
	{ columns, data, onEdit, onDelete, onView, renderAction }
) => {
	const [density, setDensity] = useState<TableOwnProps["size"]>("medium");

  const tableOptions: Partial<IconButtonProps>[] = useMemo(() => {
    return [
      {
       children: <DensitySmallOutlined/>,
       color: "primary",
       disabled: density === "small",
      onClick: () => setDensity("small"),
      title: "Compact View",
    },
  {
       children: <DensityMediumOutlined/>,
       color: "primary",
       disabled: density === "medium",
      onClick: () => setDensity("medium"),
      title: "Cozy View",
    
    }
  ]
  }, [density]);

	const formattedColumns: ColumnDefinition<GenericType>[] = useMemo(() => {
		if (onEdit || onDelete || onView || renderAction) {
			return [
        ...columns, 
        generateActionColumn({ onEdit, onDelete, onView, renderAction })
      ];
		}

		return columns;
	}, [columns]);

	return (
		<TableContainer sx={rootSx}> 
      <Stack direction="row" justifyContent="flex-end" >
          <ButtonGroup variant="outlined" size="small" aria-label="data table options">
            {
              tableOptions.map(({ title, children, ...rest }) => (
                <IconButton
                  key={title}                  
                  size="small"
                  title={title}
                  {...rest}
                >
                  {children}
                </IconButton>
            ))}
            </ButtonGroup>
        </Stack>
			<Table size={density} aria-label="data table">
				<TableHead>
					<TableRow>
						{formattedColumns.map((col) => (
							<TableCell
								align={col?.align || defaultAlign}
								key={`header-${col.title}-${col.id}`}
							>
								{col.renderHeader ? col?.renderHeader : col.header || col.title}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<TableRow key={`${row}-${row.id}`} hover>
							{formattedColumns.map((col) => (
								<TableCell
									key={`cell-${col.id}-${row.id}`}
									align={col?.align || defaultAlign}
								>
									{col.renderCell
										? col.renderCell(row)
										: (row[col.field as keyof typeof row] as ReactNode) ?? ""}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default DataTable;
