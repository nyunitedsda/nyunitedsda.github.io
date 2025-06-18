import {
	type MutationFunction,
	type MutationOptions,
	type QueryFunction,
	type QueryKey,
	type QueryOptions,
	useMutation,
	useQuery,
} from "@tanstack/react-query";

// Standard query hook
const performQuery = <TQueryFnData = unknown, TError = unknown>(
	key: QueryKey,
	queryFn: QueryFunction<TQueryFnData, QueryKey>,
	options?: Omit<
		QueryOptions<TQueryFnData, TError, TQueryFnData, QueryKey>,
		"queryKey" | "queryFn"
	>,
) => {
	return useQuery<TQueryFnData, TError, TQueryFnData, QueryKey>({
		queryKey: key,
		queryFn,
		...options,
	});
};

// Standard mutation hook
function performMutation<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown,
>(
	key: QueryKey,
	mutationFn: MutationFunction<TData, TVariables>,
	options?: Omit<
		MutationOptions<TData, TError, TVariables, TContext>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation<TData, TError, TVariables, TContext>({
		mutationKey: key,
		mutationFn,
		...options,
	});
}

export { performQuery, performMutation };
