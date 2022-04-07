import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DesktopNavigation = () => {
	return (
		<div className='flex justify-between items-center py-10 px-20'>
			<Link href='/'>
				<a href='' className='font-bold cursor-pointer text-2xl'>
					<Image
						src='/images/nestcoinLogo.png'
						alt='nest coin logo'
						width='150'
						height='30'
					/>
				</a>
			</Link>
			<button className='flex justify-between items-center border border-gray-400 px-8 py-5 rounded-md'>
				<span className='mr-4'>Connect Wallet</span>
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
