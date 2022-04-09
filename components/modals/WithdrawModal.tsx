import React, { useState, useContext } from 'react';
import WalletContext from 'context/wallet/WalletContext';
import toast, { Toaster } from 'react-hot-toast';

const WithdrawModal = ({ setWithdrawModal }: any) => {
	const [amount, setAmount] = useState('');
	const walletContext = useContext(WalletContext);

	const { address, contract } = walletContext;
	const handleWithdraw = async (contract: any, address: any) => {
		if (amount === '') {
			return toast.error('Enter amount');
		}
		try {
			await contract.methods.withdraw(amount).send({ from: address });
			toast.success('Withdraw successful');
		} catch (error) {
			toast.error((error as Error).message);
		}
	};
	return (
		<>
			<Toaster position='top-right' />
			<div className='text-white bg-zinc-600 rounded-lg p-10'>
				<div>
					<label className='block font-bold text-base mb-2' htmlFor=''>
						Token amount
					</label>
					<input
						className='bg-zinc-900 text-white border border-stone-400 rounded-lg p-5'
						type='text'
						placeholder='amount you want to withdraw'
						value={amount}
						onChange={e => setAmount(e.target.value)}
					/>
				</div>
			</div>
			<div className='mt-8 flex  flex-col items-center justify-between'>
				<button
					className='bg-blue-700 text-white flex items-center justify-center rounded-lg p-5 mt-4 w-full mb-4'
					onClick={() => handleWithdraw(contract, address)}
				>
					Withdraw
				</button>
				<button
					className='bg-black flex items-center justify-center rounded-lg p-5 w-full'
					onClick={() => setWithdrawModal(false)}
				>
					Back
				</button>
			</div>
		</>
	);
};

export default WithdrawModal;
