import type { FC } from "react";
import type { ServiceType } from "../../../api/request/types";
import EntityManager from "../../../components/EntityManager";
import ServiceEditor from "../../../forms/collection/ServiceEditor/ServiceEditor";
import DonationItem from "../../Donations/components/DonationItem";

const SERVICE_SUBHEADER = "Manage church services";
const DELETE_ITEM_TITLE = "Delete Service";
const DELETE_CONFIRMATION_TEXT =
	"Are you sure you want to delete this service? This action cannot be undone.";
const EMPTY_SERVICES_TEXT = "No services available.";

// Wrapper component to handle type compatibility
const WrappedServiceEditor = ({
	open,
	entity,
	onClose,
	onSuccess,
}: {
	open: boolean;
	entity?: Partial<ServiceType>;
	onClose: () => void;
	onSuccess?: (data?: ServiceType) => void;
}) => (
	<ServiceEditor
		open={open}
		entity={entity as ServiceType}
		onClose={onClose}
		onSuccess={onSuccess ? () => onSuccess() : undefined}
	/>
);

const ServiceManagement: FC = () => {
	return (
		<EntityManager<ServiceType>
			entityName="services"
			queryKey="admin-services"
			title=""
			subtitle={SERVICE_SUBHEADER}
			emptyText={EMPTY_SERVICES_TEXT}
			deleteConfirmation={{
				title: DELETE_ITEM_TITLE,
				message: DELETE_CONFIRMATION_TEXT,
			}}
			ItemComponent={DonationItem}
			EditorComponent={WrappedServiceEditor}
			getItemTitle={(service: ServiceType) => service?.title as string}
			getItemSubtitle={(service: ServiceType) => service.time as string}
			createNewEntity={() => ({
				title: "",
				time: "",
			})}
			successMessages={{
				save: "Service saved successfully",
				delete: "Service deleted successfully",
			}}
		/>
	);
};

export default ServiceManagement;
