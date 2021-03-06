import React, { useContext, useEffect, useState } from 'react';
import WalletContext from 'context/wallet/WalletContext';
import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Image from 'next/image';
import WithdrawModal from 'components/modals/WithdrawModal';
import useClickOutside from 'hooks/useClickOutside';
import BackPassModal from 'components/modals/BackPassModal';
import convertToEther from 'helpers/convertToEther';

const Profile = () => {
	const walletContext = useContext(WalletContext);
	const { address, getTokenBalance, contract, tokenBalance, web3 } =
		walletContext;
	const [withdrawModal, setWithdrawModal] = useState<boolean>(false);
	const [backPassModal, setBackPassModal] = useState<boolean>(false);
	const [passAmount, setPassAmount] = useState<any>('0');

	useEffect(() => {
		let mounted = true;

		if (mounted && contract !== null) {
			handleTokenBalance();
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [contract]);

	const handleTokenBalance = async () => {
		await getTokenBalance(contract, address);
	};

	const withdrawNode = useClickOutside(() => {
		setWithdrawModal(false);
	});
	const backPassNode = useClickOutside(() => {
		setBackPassModal(false);
	});
	return (
		<BasePageLayout>
			<>
				<div
					className={`${withdrawModal && 'blur-lg'} ${
						backPassModal && 'blur-lg'
					}`}
				>
					<h4 className='mt-8 mb-2'>Account Info</h4>
					<hr className='mb-8' />
					<div className='flex items-center justify-center flex-col'>
						<Image
							src='/images/pics.png'
							width={150}
							height={150}
							alt='display picture'
						/>
						<p className='mt-4 mb-16 text-stone-300'>{address}</p>
						<h5 className='text-stone-500 mb-4'>Wallet Balance:</h5>
						<div>
							<div className='flex justify-between items-center py-6 px-5 border border-stone-500 rounded-md'>
								<p className='mr-8'>Nestcoin Token (NCT)</p>
								<p>{`${convertToEther(web3, tokenBalance)} NCT`}</p>
							</div>
							<div className='flex justify-between items-center py-6 px-5 border border-stone-500 rounded-md my-4'>
								<p className='mr-8'>Back-stage Pass</p>
								<p>{passAmount}</p>
							</div>
						</div>

						<div className='mt-8'>
							<button
								className='bg-blue-700 flex items-center justify-center rounded-lg p-5 w-full'
								onClick={() => {
									setBackPassModal(true);
									setWithdrawModal(false);
								}}
								//ref={backPassNode}
							>
								Back-stage pass
							</button>
							<button
								className='bg-black text-white flex items-center justify-center rounded-lg p-5 mt-4 w-full'
								onClick={() => {
									setWithdrawModal(true);
									setBackPassModal(false);
								}}
								//ref={withdrawNode}
							>
								Withdraw
							</button>
						</div>
						{/* <div className='mt-8'>
							<h3 className='font-bold mb-4 text-stone-500 text-2xl'>
								Account Transactions
							</h3>
							<div className='text-gray-400 flex items-center justify-between mb-4'>
								<p className='mr-8'>
									0x49A4...cF3C has been rewarded with 5 NCT
								</p>
								<p>15 mins ago</p>
							</div>
							<div className='text-gray-400 flex items-center justify-between mb-4'>
								<p className='mr-8'>
									0x49A4...cF3C withdrew 25 NCT to 0x84C1...qD5Q
								</p>
								<p>1 week ago</p>
							</div>
							<div className='text-gray-400 flex items-center justify-between mb-4'>
								<p className='mr-8'>
									0x49A4...cF3C traded 5 NCT for 1 backstage pass
								</p>
								<p>6 months ago</p>
							</div>
						</div> */}
					</div>
				</div>
				{withdrawModal && (
					<div className='absolute top-1/4 left-1/4 ml-64'>
						<WithdrawModal setWithdrawModal={setWithdrawModal} />
					</div>
				)}
				{backPassModal && (
					<div className='absolute top-1/4 left-1/4 ml-64'>
						<BackPassModal setBackPassModal={setBackPassModal} setPassAmount= {setPassAmount} />
					</div>
				)}
			</>
		</BasePageLayout>
	);
};

export default Profile;
