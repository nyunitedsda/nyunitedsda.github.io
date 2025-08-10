import { useQuery } from "@tanstack/react-query";
import type { DatabaseEntity } from "@/api";
import { getDatabaseList } from "@/api";

export default <T>(entity: DatabaseEntity) =>
	useQuery<Partial<T>[]>({
		queryKey: [entity],
		queryFn: async () => await getDatabaseList(entity),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
