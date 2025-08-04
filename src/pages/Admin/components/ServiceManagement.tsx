import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import DataTable from "../../../components/DataTable/DataTable";
import type { GenericType } from "../../../components/DataTable/types";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import ServiceEditor from "../../../forms/collection/ServiceEditor/ServiceEditor";
import usePermission from "../../../hooks/auth/usePermission";
import useToken from "../../../hooks/auth/useToken";
import { initialService } from "../../../test/mock_data";
import { createAuthConfig } from "../../../utils";
import serviceColumns from "../constants/serviceColumns";

const SERVICE_SUBHEADER = "Manage church services";

// Wrapper component to handle type compatibility

const ServiceManagement: FC = () => {
	const { accessToken } = useToken();
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("services");

	const [createServiceOpen, setCreateServiceOpen] =
		useState<Partial<ServiceDT> | null>(null);

	const { data: queryData, refetch } = useQuery<
		Partial<ServiceDT>[] | undefined
	>({
		queryKey: ["services"],
		queryFn: () => getDatabaseList("services", createAuthConfig(accessToken)),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	const _handleDeleteService = useCallback(
		(data: GenericType & { id: number }) => {
			const { id } = data as GenericType & { id: number };
			deleteEntity("services", id, createAuthConfig(accessToken))
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
		[accessToken],
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
				data={queryData as unknown as GenericType[]}
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
