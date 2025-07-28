import { useCallback, useState, type FC } from "react";
import type { ServiceType } from "../../../api/request/types";
import ServiceEditor from "../../../forms/collection/ServiceEditor/ServiceEditor";
import useToken from "../../../hooks/auth/useToken";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { createAuthConfig } from "../../../utils";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import type { GenericType } from "../../../components/DataTable/types";
import { deleteEntity } from "../../../api/request/mutations";
import { initialService } from "../../../test/mock_data/services";
import DataTable from "../../../components/DataTable/DataTable";
import serviceColumns from "../constants/serviceColumns";
import usePermission from "../../../hooks/auth/usePermission";

const SERVICE_SUBHEADER = "Manage church services";

// Wrapper component to handle type compatibility

const ServiceManagement: FC = () => {
	const { accessToken } = useToken();
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("services");

	const [createServiceOpen, setCreateServiceOpen] =
		useState<Partial<ServiceType> | null>(null);

	const { data: queryData, refetch } = useQuery<
		Partial<ServiceType>[] | undefined
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
				handleClick={canCreate ? (() =>
					setCreateServiceOpen({
						...initialService,
						id: initialService.id ?? 0, // or another default id
					} as ServiceType)
				) : undefined}
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
					data={createServiceOpen as ServiceType}
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
