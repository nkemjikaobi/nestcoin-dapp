import React, { Fragment, useContext, useEffect } from 'react';
import DesktopNavigation from 'components/BasePageLayout/DesktopNavigation';
import toast, { Toaster } from 'react-hot-toast';
import WalletContext from 'context/wallet/WalletContext';
import { useRouter } from 'next/router';

interface IBasePageLayout {
	children: any;
	showNavigation?: boolean;
}

const BasePageLayout = ({ children, showNavigation }: IBasePageLayout) => {
	const walletContext = useContext(WalletContext);
	const router = useRouter();

	const {
		connectWallet,
		message,
		error,
		clearMessage,
		clearError,
		monitorAccountChanged,
		monitorDisconnect,
		provider,
		web3,
		loadContract,
		loadTokenContract,
		isAdmin,
		checkAdmin,
		address,
		contract,
	} = walletContext;

	const reconnectWallet = async () => {
		await connectWallet();
	};

	//Reconnect wallet on page refresh
	useEffect(() => {
		let mounted = true;

		if (mounted && localStorage?.getItem('isWalletConnected') === 'true') {
			reconnectWallet();
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, []);

	//Handle Messages
	useEffect(() => {
		let mounted = true;

		if (mounted && message !== null) {
			toast.success(message);
			setTimeout(() => clearMessage(), 3000);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [message]);

	//Handle Errors
	useEffect(() => {
		let mounted = true;

		if (mounted && error !== null) {
			toast.error(error);
			setTimeout(() => clearError(), 3000);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [error]);

	//monitior account changed and monitor disconnect
	useEffect(() => {
		let mounted = true;

		if (mounted && provider !== null) {
			monitorAccountChanged(provider);
			monitorDisconnect(provider);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [provider]);

	//load contract for connected users
	useEffect(() => {
		let mounted = true;

		if (mounted && web3 !== null) {
			loadContract(web3);
			loadTokenContract(web3);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [web3]);

	// useEffect(() => {
	// 	let mounted = true;

	// 	if (mounted && web3 !== null) {
	// 		loadTokenContract(web3);
	// 	}
	// 	return () => {
	// 		mounted = false;
	// 	};
	// 	//eslint-disable-next-line
	// }, [web3]);


	//check if admin
	useEffect(() => {
		let mounted = true;

		if (mounted && web3 !== null && contract !== null) {
			checkAdmin(contract, address, router);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [isAdmin, web3, contract]);

	
	return (
		<section>
			{showNavigation && (
				<>
					<Toaster position='top-right' />
					<DesktopNavigation />
				</>
			)}
			<main className='container min-h-[70vh]'>{children}</main>
		</section>
	);
};

BasePageLayout.defaultProps = {
	showNavigation: true,
	children: <Fragment />,
};

export default BasePageLayout;
