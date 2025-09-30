import styles from './App.module.scss';
import { useState, CSSProperties } from 'react';
import { Article } from '../components/article';
import { ArticleParamsForm } from '../components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from '../constants/articleProps';

export const App = () => {
	const [currentStyles, setCurrentStyles] =
		useState<ArticleStateType>(defaultArticleState);

	const updateArticleStyles = (newStyles: ArticleStateType) => {
		setCurrentStyles(newStyles);
	};

	const cssVariables = {
		'--font-family': currentStyles.fontFamilyOption.value,
		'--font-size': currentStyles.fontSizeOption.value,
		'--font-color': currentStyles.fontColor.value,
		'--container-width': currentStyles.contentWidth.value,
		'--bg-color': currentStyles.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={cssVariables}>
			<ArticleParamsForm
				currentStyles={currentStyles}
				onChange={updateArticleStyles}
			/>
			<Article />
		</main>
	);
};
