import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { ClimbingBoxLoader } from 'react-spinners';
import { Table } from '@/components/atoms/Table/Table';
import { useState, useEffect } from 'react';
import List from '@/components/atoms/List/List';

function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);

	useEffect(() => {
		if (data) {
			const keys = Object.keys(data);
			const filterKeys1 = keys.filter((key) => key.startsWith('strIngredient'));
			const filterKeys2 = filterKeys1.filter((key) => data[key] !== '' && data[key] !== null);
			const ingredients = filterKeys2.map((key, idx) => ({
				index: idx + 1,
				ingredient: data[key],
				measuer: data[`strMeasure${idx + 1}`],
			}));
			console.log(ingredients);
			setTableData(ingredients);

			//얘는 마지막이 split이니까 slice로 마지막것만 짜르면 되지 않을까
			const intructions = data.strInstructions
				.split('.')
				.map((text) => text.trim().replace('\r\n', '') + '.')
				.filter((text) => text !== '.');
			setListData(intructions);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			<ClimbingBoxLoader loading={!isSuccess} cssOverride={{ position: 'absolute', top: 350, left: '50%', transform: 'translateX(-50%)' }} color={'orange'} size={100} />
			{isSuccess && (
				<>
					<Title type={'slogan'}>{data.strMeal}</Title>

					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>
				</>
			)}

			{/* 위에서 State에 옮겨놓은 데이터를 컴포넌트에 전달 */}
			<Table data={TableData} title={data?.strMeal} />

			<List data={ListData} tag={'ol'} />
		</section>
	);
}

export default Detail;
