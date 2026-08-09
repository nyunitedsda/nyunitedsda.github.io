import { type DatabaseEntity, getDatabaseList } from "@/api";
import { type EntitiesKey, getMockEntity } from "@/test/mock_data/helpers";
import { useQuery } from "@tanstack/react-query";

export default <T>(entity: DatabaseEntity) =>
	useQuery<Partial<T>[]>({
		queryKey: [entity],
		queryFn: async () => await getDatabaseList(entity), //getMockEntity(entity as EntitiesKey),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
