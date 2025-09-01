import { type DatabaseEntity, getDatabaseList } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default <T>(entity: DatabaseEntity) =>
	useQuery<Partial<T>[]>({
		queryKey: [entity],
		queryFn: async () => await getDatabaseList(entity),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
