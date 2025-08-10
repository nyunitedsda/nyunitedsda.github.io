import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import type { ServiceDT } from "../../../api/request";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import ServiceEditor from "../../../forms/collection/ServiceEditor/ServiceEditor";
import usePermission from "../../../hooks/auth/usePermission";
import { initialService } from "../../../test/mock_data";
import serviceColumns from "../constants/serviceColumns";

const SERVICE_SUBHEADER = "Manage church services";

const ServiceManagement: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("services");

	const [createServiceOpen, setCreateServiceOpen] =
		useState<Partial<ServiceDT> | null>(null);

	const {
		data: queryData,
		refetch,
		isLoading,
	} = useQuery<Partial<ServiceDT>[] | undefined>({
		queryKey: ["services"],
		queryFn: () => getDatabaseList("services"),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	const _handleDeleteService = useCallback((data: Partial<ServiceDT>) => {
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
	}, []);

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
