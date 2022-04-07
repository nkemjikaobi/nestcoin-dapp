import React, { Fragment } from 'react';
import DesktopNavigation from 'components/BasePageLayout/DesktopNavigation';
import { Toaster } from 'react-hot-toast';

interface IBasePageLayout {
	children: any;
	showNavigation?: boolean;
}

const BasePageLayout = ({ children, showNavigation }: IBasePageLayout) => {
	return (
		<section>
			{showNavigation && (
				<>
					<Toaster position='top-right' />
					<DesktopNavigation />
				</>
			)}
			<main className='container min-h-[70vh]'>{children}</main>
		</section>
	);
};

BasePageLayout.defaultProps = {
	showNavigation: true,
	children: <Fragment />,
};

export default BasePageLayout;
