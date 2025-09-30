import { Text } from '../text';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonProps = {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	variant?: 'apply' | 'clear';
};

export const Button = ({
	title,
	onClick,
	type,
	variant = 'apply',
}: ButtonProps) => {
	return (
		<button
			className={clsx(styles.button, {
				[styles.button_apply]: variant === 'apply',
				[styles.button_clear]: variant === 'clear',
			})}
			type={type}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
