import { ArrowButton } from '@shared/ui/ArrowButton';
import { arrowButtonColor, arrowButtonDirection } from '@shared/ui/ArrowButton/interfaces';
import { useEffect, useState } from 'react';
import { bem } from '@shared/utils/helpers/bem';
import './style.scss';

export const ButtonScrollTopBottom = () => {
	const [isScrollFromBottom, setIsScrollFromBottom] = useState(false);
	const [block] = bem('button-scroll-top-bottom');
	
	const handleScrollToBottom = () => {
		window.scroll({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth',
		});
	};
	
	const handleScrollToTop = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
	};
	
	
	useEffect(() => {
		const indent = 20;
		const handleScroll = () => {
			const { scrollHeight, scrollTop } = document.documentElement;
			
			if (scrollHeight - scrollTop - window.innerHeight < indent)
				return setIsScrollFromBottom(true);
			
			setIsScrollFromBottom(false);
		};
		
		addEventListener('scroll', handleScroll);
		
		return () => removeEventListener('scroll', handleScroll);
	}, []);
	
	return (
		<>
			{
				isScrollFromBottom
					? <ArrowButton
						direction={arrowButtonDirection.top}
						color={arrowButtonColor.filled}
						className={block()}
						onClick={handleScrollToTop}
					/> :
					<ArrowButton
						direction={arrowButtonDirection.bottom}
						color={arrowButtonColor.filled}
						className={block()}
						onClick={handleScrollToBottom}
					/>
			}
		</>
	);
};