import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import clsx from 'clsx';
import { SyntheticEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
	backgroundColors,
	fontColors,
	fontFamilyOptions,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';

type ArticleParamsFormProps = {
	currientArticleState: ArticleStateType;
	setCurrientArticleState: (params: any) => void;
};

export const ArticleParamsForm = ({
	currientArticleState,
	setCurrientArticleState,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLElement>(null);

	// стейты
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

	const [newFontColor, setNewFontColor] = useState(
		currientArticleState.fontColor
	);
	const [newFont, setNewFont] = useState(currientArticleState.fontFamilyOption);

	const [newBackgroundColor, setNewBackgroundColor] = useState(
		currientArticleState.backgroundColor
	);

	const [newContentWidth, setNewContentWidth] = useState(
		currientArticleState.contentWidth
	);

	const [newFontSizeOption, setNewFontSizeOption] = useState(
		currientArticleState.fontSizeOption
	);

	// функция открытия сайдбара
	const formOpenHandler = () => {
		setIsOpenForm(!isOpenForm);
	};

	// хук закрытия сайдбара при клике по оверлейю
	useOutsideClickClose({
		isOpen: isOpenForm,
		rootRef,
		onClose: formOpenHandler,
		onChange: setIsOpenForm,
	});

	// функция сабмита формы
	const formSubmitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		setCurrientArticleState({
			...currientArticleState,
			fontFamilyOption: newFont,
			fontColor: newFontColor,
			backgroundColor: newBackgroundColor,
			contentWidth: newContentWidth,
			fontSizeOption: newFontSizeOption,
		});
	};

	// функция сброса состояния статьи и формы к начальному
	const returnToDefaultState = () => {
		setCurrientArticleState({
			...currientArticleState,
			fontColor: defaultArticleState,
			fontFamilyOption: defaultArticleState,
			backgroundColor: defaultArticleState,
			contentWidth: defaultArticleState,
			fontSizeOption: defaultArticleState,
		});
		setNewFont(defaultArticleState.fontFamilyOption);
		setNewFontSizeOption(defaultArticleState.fontSizeOption);
		setNewFontColor(defaultArticleState.fontColor);
		setNewBackgroundColor(defaultArticleState.backgroundColor);
		setNewContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<>
			<ArrowButton onClick={formOpenHandler} isOpen={isOpenForm} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form onSubmit={formSubmitHandler} className={styles.form}>
					<Text weight={800} uppercase size={31}>
						Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						selected={newFont}
						title='шрифт'
						onChange={setNewFont}
					/>

					<RadioGroup
						name={'ff'}
						options={fontSizeOptions}
						selected={newFontSizeOption}
						title={'размер шрифта'}
						onChange={setNewFontSizeOption}
					/>

					<Select
						options={fontColors}
						selected={newFontColor}
						title='цвет шрифта'
						onChange={setNewFontColor}
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={newBackgroundColor}
						title='цвет фона'
						onChange={setNewBackgroundColor}
					/>

					<Select
						options={contentWidthArr}
						selected={newContentWidth}
						title='ширина контента'
						onChange={setNewContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={returnToDefaultState}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
