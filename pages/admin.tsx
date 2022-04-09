import React, { useContext, useEffect, useState } from 'react';
import WalletContext from 'context/wallet/WalletContext';
import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Image from 'next/image';
import WithdrawModal from 'components/modals/WithdrawModal';
import useClickOutside from 'hooks/useClickOutside';
import BackPassModal from 'components/modals/BackPassModal';
import convertToEther from 'helpers/convertToEther';
import AddAdminModal from 'components/modals/AddAdminModal';
import RemoveAdminModal from 'components/modals/RemoveAdminModal';

const Admin = () => {
	const walletContext = useContext(WalletContext);
	const { address, getTotalNumberOfTokens, contract, numberOfTokens, web3 } =
		walletContext;
	const [addModal, setAddModal] = useState<boolean>(false);
	const [removeModal, setRemoveModal] = useState<boolean>(false);

	useEffect(() => {
		let mounted = true;

		if (mounted && contract !== null) {
			handleTotalBalance();
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [contract]);

	const handleTotalBalance = async () => {
		await getTotalNumberOfTokens(contract, address);
	};

	const addNode = useClickOutside(() => {
		setAddModal(false);
	});
	const removeNode = useClickOutside(() => {
		setRemoveModal(false);
	});
	return (
		<BasePageLayout>
			<>
				<div className={`${addModal && 'blur-lg'} ${removeModal && 'blur-lg'}`}>
					<h4 className='mt-8 mb-2 text-4xl'>Admin Account Info</h4>
					<hr className='mb-8' />
					<div className='flex items-center justify-center flex-col'>
						<Image
							src='/images/pics.png'
							width={150}
							height={150}
							alt='display picture'
						/>
						<p className='mt-4 mb-16 text-stone-300'>{address}</p>
						<h5 className='text-stone-500 mb-4'>Token Details:</h5>
						<div>
							<div className='flex justify-between items-center py-6 px-5 border border-stone-500 rounded-md'>
								<p className='mr-8'>Total Number of Tokens</p>
								<p>{`${convertToEther(web3, numberOfTokens)} NCT`}</p>
							</div>
							{/* <div className='flex justify-between items-center py-6 px-5 border border-stone-500 rounded-md my-4'>
								<p className='mr-8'>Back-stage Pass</p>
								<p>3</p>
							</div> */}
						</div>

						<div className='mt-8'>
							<button
								className='bg-blue-700 flex items-center justify-center rounded-lg p-5 w-full'
								onClick={() => {
									setAddModal(true);
									setRemoveModal(false);
								}}
								//ref={backPassNode}
							>
								Add Admin
							</button>
							<button
								className='bg-black text-white flex items-center justify-center rounded-lg p-5 mt-4 w-full'
								onClick={() => {
									setRemoveModal(true);
									setAddModal(false);
								}}
								//ref={withdrawNode}
							>
								Remove Admin
							</button>
						</div>
					</div>
				</div>
				{addModal && (
					<div className='absolute top-1/4 left-1/4 ml-64'>
						<AddAdminModal setAddModal={setAddModal} />
					</div>
				)}
				{removeModal && (
					<div className='absolute top-1/4 left-1/4 ml-64'>
						<RemoveAdminModal setRemoveModal={setRemoveModal} />
					</div>
				)}
			</>
		</BasePageLayout>
	);
};

export default Admin;
