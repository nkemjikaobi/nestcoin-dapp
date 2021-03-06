import React, { useReducer } from 'react';
import WalletContext from './WalletContext';
import WalletReducer from './WalletReducer';
import {
	CONNECT_WALLET,
	ERROR,
	CLEAR_ERROR,
	CLEAR_MESSAGE,
	DISCONNECT_WALLET,
	MONITOR_ACCOUNT_CHANGED,
	MONITOR_DISCONNECT,
	LOAD_CONTRACT,
	LOAD_TOKEN,
	PAY_FOR_PERKS,
	GET_TOKEN_BALANCE,
	CHECK_ADMIN,
	GET_TOTAL_NUMBER_OF_TOKENS,
} from '../types';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import NFTJson from 'artifacts/nft.json';
import TokenJson from 'artifacts/tokenCon.json';
import convertToEther from 'helpers/convertToEther';

const WalletState = (props: any) => {
	const initialState = {
		address: null,
		isConnected: false,
		balance: '',
		error: null,
		message: null,
		web3: null,
		provider: null,
		symbol: '',
		providerOptions: null,
		web3Modal: null,
		contract: null,
		tokenContract: null,
		tokenBalance: '',
		isAdmin: false,
		numberOfTokens: '',
	};

	const [state, dispatch] = useReducer(WalletReducer, initialState);

	//Connect Wallet
	const connectWallet = async () => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: process.env.NEXT_PUBLIC_INFURA_APP_ID,
				},
			},
		};
		const web3Modal = new Web3Modal({
			theme: 'dark',
			network: 'mainnet', // optional
			cacheProvider: true, // optional
			providerOptions, // required
			//disableInjectedProvider: false
		});
		try {
			const provider = await web3Modal.connect();

			const web3 = new Web3(provider);

			//  Get Accounts
			const accounts = await web3.eth.getAccounts();

			if (accounts.length > 0) {
				//Get Balance
				let balance;
				await web3.eth.getBalance(`${accounts[0]}`, function (err, result) {
					if (err) {
						dispatch({
							type: ERROR,
							payload: err.message,
						});
					} else {
						balance = convertToEther(web3, result);
					}
				});
				dispatch({
					type: CONNECT_WALLET,
					payload: {
						balance,
						accounts,
						web3,
						web3Modal,
						providerOptions,
						provider,
					},
				});
				localStorage.setItem('isWalletConnected', 'true');
				localStorage.setItem('count', '1');
			}
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//Load Contract
	const loadTokenContract = async (web3: any) => {
		try {
			// console.log(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
			// console.log(NFTJson);
			const tokenContract = new web3.eth.Contract(
				TokenJson,
				`${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`
			);
			dispatch({
				type: LOAD_TOKEN,
				payload: tokenContract,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	const loadContract = async (web3: any) => {
		try {
			// console.log(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
			// console.log(NFTJson);
			const contract = new web3.eth.Contract(
				NFTJson,
				`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`
			);
			dispatch({
				type: LOAD_CONTRACT,
				payload: contract,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	const payForPerks = async (tokenContract: any, address: string, amount: any) => {
		try {
			console.log(tokenContract);
			const response = await tokenContract.methods
				.payForPerks(amount, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
				.send({ from: address });
			console.log(response);
			// dispatch({
			// 	type: LOAD_CONTRACT,
			// 	payload: contract,
			// });
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	const getTokenBalance = async (contract: any, address: string) => {
		try {
			const response = await contract.methods
				.getTokenBalance()
				.call({ from: address });
			dispatch({
				type: GET_TOKEN_BALANCE,
				payload: response,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};
	const getTotalNumberOfTokens = async (contract: any, address: string) => {
		try {
			const response = await contract.methods
				.getTokenBalance()
				.call({ from: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS });
			dispatch({
				type: GET_TOTAL_NUMBER_OF_TOKENS,
				payload: response,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	const checkAdmin = async (contract: any, address: string, router: any) => {
		try {
			const response = await contract.methods
				.isAdmin(address)
				.call();
			dispatch({
				type: CHECK_ADMIN,
				payload: response,
			});
			if (response) {
				router.push('/admin');
			} else {
				router.push('/profile');
			}
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//Clear Error
	const clearError = () => {
		dispatch({
			type: CLEAR_ERROR,
		});
	};

	//Clear Message
	const clearMessage = () => {
		dispatch({
			type: CLEAR_MESSAGE,
		});
	};

	//Disconnect wallet
	const disconnectWallet = async (modal: any) => {
		modal.clearCachedProvider();
		dispatch({
			type: DISCONNECT_WALLET,
		});
		localStorage.removeItem('isWalletConnected');
		localStorage.removeItem('count');
	};

	//Monitor disconnect
	const monitorDisconnect = async (provider: any) => {
		// Subscribe to session disconnection
		provider.on('disconnect', (code: number, reason: string) => {
			dispatch({
				type: MONITOR_DISCONNECT,
				payload: reason,
			});
			localStorage.removeItem('isWalletConnected');
			localStorage.removeItem('count');
		});
	};
	//Monitor account changed
	const monitorAccountChanged = async (provider: any) => {
		// Subscribe to accounts change
		provider.on('accountsChanged', (accounts: string[]) => {
			dispatch({
				type: MONITOR_ACCOUNT_CHANGED,
			});
			localStorage.removeItem('isWalletConnected');
			localStorage.removeItem('count');
		});
	};

	return (
		<WalletContext.Provider
			value={{
				address: state.address,
				isConnected: state.isConnected,
				balance: state.balance,
				error: state.error,
				message: state.message,
				web3: state.web3,
				provider: state.provider,
				symbol: state.symbol,
				providerOptions: state.providerOptions,
				web3Modal: state.web3Modal,
				contract: state.contract,
				tokenContract: state.tokenContract,
				tokenBalance: state.tokenBalance,
				isAdmin: state.isAdmin,
				numberOfTokens: state.numberOfTokens,
				clearError,
				connectWallet,
				disconnectWallet,
				clearMessage,
				monitorAccountChanged,
				monitorDisconnect,
				loadContract,
				loadTokenContract,
				payForPerks,
				getTokenBalance,
				checkAdmin,
				getTotalNumberOfTokens,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};

export default WalletState;
