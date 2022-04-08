import React, { useContext, useEffect } from 'react';
import WalletContext from 'context/wallet/WalletContext';
import { useRouter } from 'next/router';
import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Image from 'next/image';

const Profile = () => {
	const walletContext = useContext(WalletContext);
	const { isConnected, address } = walletContext;
	const router = useRouter();
	useEffect(() => {
		let mounted = true;

		if (mounted && !isConnected) {
			router.push('/');
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [isConnected]);
	return (
		<BasePageLayout>
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
						<p>25</p>
					</div>
					<div className='flex justify-between items-center py-6 px-5 border border-stone-500 rounded-md my-4'>
						<p className='mr-8'>Back-stage Pass</p>
						<p>3</p>
					</div>
				</div>

				<div className='mt-8'>
					<button className='bg-blue-700 flex items-center justify-center rounded-lg p-5 w-full'>
						Back-stage pass
					</button>
					<button className='bg-black text-white flex items-center justify-center rounded-lg p-5 mt-4 w-full'>
						Withdraw
					</button>
				</div>
				<div className='mt-8'>
					<h3 className='font-bold mb-4 text-stone-500 text-2xl'>
						Account Transactions
					</h3>
					<div className='text-gray-400 flex items-center justify-between mb-4'>
						<p className='mr-8'>0x49A4...cF3C has been rewarded with 5 NCT</p>
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
				</div>
			</div>
		</BasePageLayout>
	);
};

export default Profile;
