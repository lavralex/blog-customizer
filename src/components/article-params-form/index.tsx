import { useState, useRef, SyntheticEvent } from 'react';
import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Select } from '../../ui/select';
import { Text } from '../../ui/text';
import { useClose } from '../../hooks/useClose';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentStyles: ArticleStateType;
	onChange: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentStyles,
	onChange,
}: ArticleParamsFormProps) => {
	const defaultSettings = useRef<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	const [menuVisible, setMenuVisible] = useState<boolean>(false);

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		currentStyles.fontFamilyOption
	);
	const [selectedSize, setSelectedSize] = useState<OptionType>(
		currentStyles.fontSizeOption
	);
	const [selectedBg, setSelectedBg] = useState<OptionType>(
		currentStyles.backgroundColor
	);
	const [selectedColor, setSelectedColor] = useState<OptionType>(
		currentStyles.fontColor
	);
	const [selectedWidth, setSelectedWidth] = useState<OptionType>(
		currentStyles.contentWidth
	);

	useClose({
		isOpen: menuVisible,
		onClose: () => setMenuVisible(false),
		rootRef: formRef,
	});

	const toggleMenuVisibility = () => {
		setMenuVisible((current) => !current);
	};

	const handleOptionChange = (type: string) => (option: OptionType) => {
		switch (type) {
			case 'font':
				setSelectedFont(option);
				break;
			case 'size':
				setSelectedSize(option);
				break;
			case 'background':
				setSelectedBg(option);
				break;
			case 'color':
				setSelectedColor(option);
				break;
			case 'width':
				setSelectedWidth(option);
				break;
			default:
				break;
		}
	};

	const processFormSubmission = (e: SyntheticEvent) => {
		e.preventDefault();

		const formData = {
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedSize,
			backgroundColor: selectedBg,
			fontColor: selectedColor,
			contentWidth: selectedWidth,
		};

		onChange(formData);
	};

	const resetToDefaults = () => {
		const defaults = defaultSettings.current;
		setSelectedFont(defaults.fontFamilyOption);
		setSelectedSize(defaults.fontSizeOption);
		setSelectedBg(defaults.backgroundColor);
		setSelectedColor(defaults.fontColor);
		setSelectedWidth(defaults.contentWidth);
		onChange(defaults);
	};

	return (
		<div ref={formRef}>
			<ArrowButton onClick={toggleMenuVisibility} isOpen={menuVisible} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: menuVisible,
				})}>
				<form className={styles.form} onSubmit={processFormSubmission}>
					<Text as='h2' size={31} weight={800} uppercase>
						Параметры оформления
					</Text>
					<div style={{ height: '50px' }}></div>

					<Select
						options={fontFamilyOptions}
						selected={selectedFont}
						onChange={handleOptionChange('font')}
						title='Тип шрифта'
					/>
					<div style={{ height: '50px' }}></div>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={selectedSize}
						onChange={handleOptionChange('size')}
						title='Величина шрифта'
					/>
					<div style={{ height: '50px' }}></div>

					<Select
						options={fontColors}
						selected={selectedColor}
						onChange={handleOptionChange('color')}
						title='Цвет текста'
					/>
					<div style={{ height: '50px' }}></div>
					<Separator />
					<div style={{ height: '50px' }}></div>

					<Select
						options={backgroundColors}
						selected={selectedBg}
						onChange={handleOptionChange('background')}
						title='Цвет фона'
					/>
					<div style={{ height: '50px' }}></div>

					<Select
						options={contentWidthArr}
						selected={selectedWidth}
						onChange={handleOptionChange('width')}
						title='Ширина содержимого'
					/>
					<div style={{ height: '207px' }}></div>

					<div className={styles.bottomContainer}>
						<Button
							title='Восстановить настройки'
							type='reset'
							onClick={resetToDefaults}
							variant='clear'
						/>
						<Button title='Сохранить изменения' type='submit' variant='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
