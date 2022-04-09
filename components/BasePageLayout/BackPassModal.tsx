import React, { useState, useContext } from 'react';
import WalletContext from 'context/wallet/WalletContext';
import toast, { Toaster } from 'react-hot-toast';

const BackPassModal = ({ setBackPassModal }: any) => {
	const [amount, setAmount] = useState('');
	const walletContext = useContext(WalletContext);
	const { payForPerks, contract, address } = walletContext;

	const handleClick = async () => {
		if (amount === '') {
			return toast.error('Please enter an amount');
		}
		await payForPerks(contract, address, amount);
	}
	return (
		<>
			<Toaster position='top-right' />
			<div className='text-white bg-zinc-600 rounded-lg p-10'>
				<div className='mb-4'>
					<label className='block font-bold text-base mb-2' htmlFor=''>
						Number
					</label>
					<input
						type='text'
						className='bg-zinc-900 text-white rounded-lg p-5 border border-stone-400'
						placeholder='wallet balance 25 NCT'
						value = {amount}
						onChange = {(e)=>setAmount(e.target.value)}
					/>
				</div>
			</div>
			<div className='mt-8 flex  flex-col items-center justify-between'>
				<button className='bg-blue-700 text-white flex items-center justify-center rounded-lg p-5 mt-4 w-full mb-4' onClick = {() => {handleClick()}}>
					Send
				</button>
				<button
					className='bg-black flex items-center justify-center rounded-lg p-5 w-full'
					onClick={() => setBackPassModal(false)}
				>
					Back
				</button>
			</div>
		</>
	);
};

export default BackPassModal;
