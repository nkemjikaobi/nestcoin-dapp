import WalletContext from 'context/wallet/WalletContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';

const DesktopNavigation = () => {
	const walletContext = useContext(WalletContext);
	const { connectWallet, isConnected, balance, disconnectWallet, web3Modal } =
		walletContext;

	const handleClick = async () => {
		if (isConnected) {
			return await disconnectWallet(web3Modal);
		} else {
			return await connectWallet();
		}
	};
	return (
		<div className='flex justify-between items-center py-10 px-20 relative'>
			<Link href='/' passHref>
				<a
					href=''
					className=' hidden tablet:block font-bold cursor-pointer text-2xl absolute top-10 left-10'
				>
					<Image
						src='/images/nestcoinLogo.png'
						alt='nest coin logo'
						width='150'
						height='30'
					/>
				</a>
			</Link>
			<Link href='/' passHref>
				<a
					href=''
					className='tablet:hidden mt-4 font-bold cursor-pointer text-2xl absolute top-10 left-10'
				>
					<Image
						src='/images/nestcoinLogo.png'
						alt='nest coin logo'
						width='100'
						height='20'
					/>
				</a>
			</Link>

			<button
				className='flex justify-between items-center border border-gray-400 p-3 tablet:px-8 tablet:py-5 rounded-md absolute top-10 right-10'
				onClick={() => handleClick()}
			>
				{isConnected && (
					<span className='mr-4 cursor-pointer' onClick={() => handleClick()}>
						Disconnect
					</span>
				)}
				<span className='mr-4'>
					{balance !== '' ? (
						<p>{Number(balance).toFixed(4)} ETH</p>
					) : (
						<p>Connect Wallet</p>
					)}
				</span>
				<Image
					src='/images/metamask.svg'
					alt='nest coin logo'
					width='20'
					height='20'
				/>
			</button>
		</div>
	);
};

export default DesktopNavigation;
