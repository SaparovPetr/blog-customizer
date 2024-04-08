import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import { Article } from 'src/components/article';
import { ArticleParamsForm } from 'src/components/article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';
import styles from './app.module.scss';

export const App = () => {
	const [currientArticleState, setCurrientArticleState] =
		useState(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currientArticleState.fontFamilyOption.value,
					'--font-size': currientArticleState.fontSizeOption.value,
					'--font-color': currientArticleState.fontColor.value,
					'--container-width': currientArticleState.contentWidth.value,
					'--bg-color': currientArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currientArticleState={currientArticleState}
				setCurrientArticleState={setCurrientArticleState}
			/>
			<Article />
		</div>
	);
};
