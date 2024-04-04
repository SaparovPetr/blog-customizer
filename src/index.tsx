import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
