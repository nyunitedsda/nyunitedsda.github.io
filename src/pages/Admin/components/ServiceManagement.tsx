import DataTable from "@components/DataTable";
import { PageTitle } from "@components/PageWrapper";
import { ServiceEditor } from "@forms/collection";
import { useEntityList } from "@hooks/api";
import { usePermission } from "@hooks/auth";
import { initialService } from "@test/mock_data";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import type { ServiceDT } from "@/api";
import { deleteEntity } from "@/api";
import serviceColumns from "../constants/serviceColumns";

const SERVICE_SUBHEADER = "Manage church services";

const ServiceManagement: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("services");
	const {
		data: queryData,
		refetch,
		isLoading,
	} = useEntityList<ServiceDT>("services");

	const [createServiceOpen, setCreateServiceOpen] =
		useState<Partial<ServiceDT> | null>(null);

	const _handleDeleteService = useCallback(
		(data: Partial<ServiceDT>) => {
			const { id } = data as ServiceDT;
			deleteEntity("services", id)
				.then(() => {
					refetch();
					enqueueSnackbar("Service deleted successfully", {
						variant: "success",
					});
				})
				.catch((error) => {
					console.error("Failed to delete service:", error);
					enqueueSnackbar("Failed to delete service", {
						variant: "error",
					});
				});
		},
		[refetch, enqueueSnackbar],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={SERVICE_SUBHEADER}
				handleClick={
					canCreate
						? () =>
								setCreateServiceOpen({
									...initialService,
									id: initialService.id ?? 0, // or another default id
								} as ServiceDT)
						: undefined
				}
			/>

			<DataTable
				isLoading={isLoading}
				data={queryData as Partial<ServiceDT>[]}
				columns={serviceColumns}
				onEdit={canEdit ? setCreateServiceOpen : undefined}
				onDelete={canDelete ? _handleDeleteService : undefined}
			/>

			{createServiceOpen && (
				<ServiceEditor
					open={!!createServiceOpen}
					data={createServiceOpen as ServiceDT}
					onClose={() => setCreateServiceOpen(null)}
					onSuccess={() => {
						refetch();
						setCreateServiceOpen(null);
					}}
				/>
			)}
		</>
	);
};

export default ServiceManagement;
