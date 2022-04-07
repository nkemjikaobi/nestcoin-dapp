import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import type { NextPage } from 'next';
import styles from '../styles/index.module.css';

const Home: NextPage = () => {
	return (
		<BasePageLayout>
			<div className='flex flex-col tablet:flex-row mt-16 justify-between items-center'>
				<div className={styles.left}>
					<h3 className='text-white text-2xl tablet:text-5xl font-extrabold text-center my-8 w-3/4 mx-auto'>
						Unlimited movies, TV shows, and more
					</h3>
					<p className='text-stone-600 text-base tablet:text-2xl mt-8 tablet:mt-16 text-center w-3/4 mx-auto'>
						For fans of movies and shows, we provide better experience, and
						empower real human connection by bringing people and enetertainment
						together.{' '}
					</p>
				</div>
				<div className={styles.right}>
					<h3 className='text-white text-2xl tablet:text-5xl font-extrabold text-center my-8 w-3/4 tablet:w-full mx-auto'>
						Get rewarded for just being a loyal customer.
					</h3>
					<p className='text-stone-600 text-base tablet:text-2xl mt-8 tablet:mt-16 text-center w-3/4 tablet:w-full mx-auto'>
						We occasionally reward our loyal customers as a way of appreciation
						and engaging more with our audience.
					</p>
				</div>
			</div>
			<p className='text-stone-200 text-center mt-32'>
				Join now by connecting to your Metamask wallect !
			</p>
		</BasePageLayout>
	);
};

export default Home;
