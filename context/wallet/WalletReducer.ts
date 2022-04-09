import {
	CONNECT_WALLET,
	ERROR,
	CLEAR_ERROR,
	CLEAR_MESSAGE,
	DISCONNECT_WALLET,
	MONITOR_ACCOUNT_CHANGED,
	MONITOR_DISCONNECT,
	LOAD_CONTRACT,
	GET_TOKEN_BALANCE,
	CHECK_ADMIN,
	GET_TOTAL_NUMBER_OF_TOKENS,
} from '../types';

const contactReducer = (state: any, action: any) => {
	switch (action.type) {
		case CONNECT_WALLET:
			const count = localStorage.getItem('count');
			return {
				...state,
				address: action.payload.accounts[0],
				isConnected: true,
				balance: action.payload.balance,
				//message: count === '1' ? null : 'Wallet connected',
				web3: action.payload.web3,
				web3Modal: action.payload.web3Modal,
				providerOptions: action.payload.providerOptions,
				provider: action.payload.provider,
			};
		case LOAD_CONTRACT:
			return {
				...state,
				contract: action.payload,
			};
		case CHECK_ADMIN:
			return {
				...state,
				isAdmin: action.payload,
			};
		case GET_TOKEN_BALANCE:
			return {
				...state,
				tokenBalance: action.payload,
			};
		case GET_TOTAL_NUMBER_OF_TOKENS:
			return {
				...state,
				numberOfTokens: action.payload,
			};
		case DISCONNECT_WALLET:
			const count2 = localStorage.getItem('count');
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
				//message: count2 === '1' ? null : 'Wallet Disconnected',
				web3: null,
				web3Modal: null,
				providerOptions: null,
				provider: null,
			};
		case MONITOR_DISCONNECT:
			return {
				...state,
				error: action.payload,
				isConnected: false,
				balance: '',
				address: null,
			};
		case MONITOR_ACCOUNT_CHANGED:
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
			};
		case ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case CLEAR_MESSAGE:
			return {
				...state,
				message: null,
			};
		default:
			return state;
	}
};
export default contactReducer;
