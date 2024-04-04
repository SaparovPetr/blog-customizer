import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import clsx from 'clsx';
import { SyntheticEvent, useRef, useState } from 'react';
import { ArticleStateType, fontColors } from '../../constants/articleProps';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currientArticleState: ArticleStateType;
	setCurrientArticleState: (params: any) => void;
};

export const ArticleParamsForm = ({
	currientArticleState,
	setCurrientArticleState,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLElement>(null);
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
	const [newFontColor, setNewFontColor] = useState(
		currientArticleState.fontColor
	);

	const formOpenHandler = () => {
		setIsOpenForm(!isOpenForm);
	};

	useOutsideClickClose({
		isOpen: isOpenForm,
		rootRef,
		onClose: formOpenHandler,
		onChange: setIsOpenForm,
	});

	const formSubmitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		setCurrientArticleState({
			...currientArticleState,
			fontColor: newFontColor,
		});
	};

	return (
		<>
			<ArrowButton onClick={formOpenHandler} isOpen={isOpenForm} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form onSubmit={formSubmitHandler} className={styles.form}>
					<Select
						options={fontColors}
						selected={newFontColor}
						title='цвет'
						onChange={setNewFontColor}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
