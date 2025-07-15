// Export the existing authentication context hook

// Export the new authentication API hooks
export {
	useAuthStatus,
	useCurrentUser,
	useLogin,
	useLogout,
	useRefreshToken,
	useRegister,
	useRequestPasswordReset,
	useResetPassword,
	useVerifyEmail,
} from "./useAuthAPI";
export { default as useAuthentication } from "./useAuthentication";
