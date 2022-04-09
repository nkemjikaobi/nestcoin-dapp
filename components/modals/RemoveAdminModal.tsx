import React, { useState, useContext } from 'react';
import WalletContext from 'context/wallet/WalletContext';
import toast, { Toaster } from 'react-hot-toast';

const RemoveAdminModal = ({ setRemoveModal }: any) => {
	const [userAddress, setAddress] = useState('');
	const walletContext = useContext(WalletContext);

	const { address, contract } = walletContext;

	const handleRemoveadmin = async (contract: any, address: any) => {
		if (userAddress === '') {
			return toast.error('No address detected');
		}
		try {
			await contract.methods.removeAdmin(userAddress).send({ from: address });
			toast.success('Admin removed');
		} catch (error) {
			toast.error((error as Error).message);
		}
	};
	return (
		<>
			<Toaster position='top-right' />
			<div className='text-white bg-zinc-600 rounded-lg p-10'>
				<div className='mb-4'>
					<label className='block font-bold text-base mb-2' htmlFor=''>
						Wallet address
					</label>
					<input
						type='text'
						className='bg-zinc-900 text-white rounded-lg p-5 border border-stone-400'
						placeholder='address of the wallet'
						value={userAddress}
						onChange={e => setAddress(e.target.value)}
					/>
				</div>
			</div>
			<div className='mt-8 flex  flex-col items-center justify-between'>
				<button
					className='bg-blue-700 text-white flex items-center justify-center rounded-lg p-5 mt-4 w-full mb-4'
					onClick={() => handleRemoveadmin(contract, address)}
				>
					Remove
				</button>
				<button
					className='bg-black flex items-center justify-center rounded-lg p-5 w-full'
					onClick={() => setRemoveModal(false)}
				>
					Back
				</button>
			</div>
		</>
	);
};

export default RemoveAdminModal;
