import React from 'react';

const WithdrawModal = ({ setWithdrawModal }: any) => {
	return (
		<>
			<div className='text-white bg-zinc-600 rounded-lg p-10'>
				<div className='mb-4'>
					<label className='block font-bold text-base mb-2' htmlFor=''>
						Wallet address
					</label>
					<input
						type='text'
						className='bg-zinc-900 text-white rounded-lg p-5 border border-stone-400'
						placeholder='address of the wallet'
					/>
				</div>
				<div>
					<label className='block font-bold text-base mb-2' htmlFor=''>
						Token amount
					</label>
					<input
						className='bg-zinc-900 text-white border border-stone-400 rounded-lg p-5'
						type='text'
						placeholder='amount you want to withdraw'
					/>
				</div>
			</div>
			<div className='mt-8 flex  flex-col items-center justify-between'>
				<button
					className='bg-blue-700 flex items-center justify-center rounded-lg p-5 w-full'
					onClick={() => setWithdrawModal(false)}
				>
					Back
				</button>
				<button className='bg-black text-white flex items-center justify-center rounded-lg p-5 mt-4 w-full'>
					Send
				</button>
			</div>
		</>
	);
};

export default WithdrawModal;
