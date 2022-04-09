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
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import toast, { Toaster } from 'react-hot-toast';

const Admin = () => {
	const walletContext = useContext(WalletContext);
	const { address, getTotalNumberOfTokens, contract, numberOfTokens, web3 } =
		walletContext;
	const [addModal, setAddModal] = useState<boolean>(false);
	const [removeModal, setRemoveModal] = useState<boolean>(false);
	const [amount, setAmount] = useState('');
	const [addresses, setAddresses] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [amountOfEth, setAmountOfEth] = useState(0);


	useEffect(() => {
		let mounted = true;

		if (mounted && contract !== null) {
			handleTotalBalance();
            checkOwner(address);
            getContractBalance();
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [contract]);

	const handleTotalBalance = async () => {
		await getTotalNumberOfTokens(contract, address);
	};

    const checkOwner = async (address: any) => {
		try {
			const response = await contract.methods
				.isContractOwner(address)
				.call();
            setIsOwner(response);
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

    const getContractBalance = async () => {
        const bal = await web3.eth.getBalance(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);
        setAmountOfEth(bal);
    }

    // const sendEthtoContract = async (amount: string) => {
    //     await web3.eth.sendTransaction({from: address, to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, value: web3.toWei(Number(amount),"ether")});
    // }

	const handleRewardUsers = async (
		contract: any,
		addresses: any[],
		amount: string
	) => {
        setLoading(true);
		if (addresses.length === 0 || amount === '') {
			return toast.error('Some fields are empty');
		}
		try {
			await contract.methods
				.rewardUsers(addresses, amount)
				.send({ from: address });
			toast.success('User rewarded');
            handleTotalBalance();
            setAmount('');
            setAddresses([]);
		} catch (error) {
			toast.error((error as Error).message);
		}
        
        setLoading(false);
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
				<Toaster position='top-right' />
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
                        <h3 className='text-stone-300 mb-4'>{process.env.NEXT_PUBLIC_TOKEN_ADDRESS}</h3>
                        <h5 className='text-stone-500 mb-4'>Contract ETH Balance</h5>
                        <h2 className='text-stone-300 mb-4'>{`${amountOfEth/1000000000000000000} ETH`}</h2>
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
							{isOwner && <button
								className='bg-black text-white flex items-center justify-center rounded-lg p-5 mt-4 w-full'
								onClick={() => {
									setRemoveModal(true);
									setAddModal(false);
								}}
								//ref={withdrawNode}
							>
								Remove Admin
							</button>}
						</div>
						<h4 className='mt-16 mb-2 text-2xl'>Reward Users</h4>
						<p className='text-stone-300 mb-4'>
							Enter the addresses you want to reward and press enter after each
						</p>
						<div className='w-1/3'>
							<ReactMultiEmail
								placeholder='Enter addresses'
								emails={addresses}
								onChange={(_addresses: any[]) => {
									setAddresses(_addresses);
								}}
								validateEmail={email => {
									return true; // return boolean
								}}
								getLabel={(
									email: string,
									index: number,
									removeEmail: (index: number) => void
								) => {
									return (
										<div data-tag key={index}>
											{email}
											<span data-tag-handle onClick={() => removeEmail(index)}>
												×
											</span>
										</div>
									);
								}}
							/>
						</div>
						<label className='block font-bold text-base mb-2 mt-4' htmlFor=''>
							Number of tokens to reward
						</label>
						<input
							type='text'
							className='bg-zinc-900 text-white rounded-lg p-5 border border-stone-400 mb-8'
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
						<div className='w-96'>
							<button
								className='bg-blue-700 text-white flex items-center justify-center rounded-lg p-5 mt-2 w-full mb-4'
								onClick={() => {
									handleRewardUsers(contract, addresses, amount);
								}}
							>
								{loading ? 'Sending Tokens ...' : 'Reward'}
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
