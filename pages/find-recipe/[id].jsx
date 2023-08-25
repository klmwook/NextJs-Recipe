import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { ClimbingBoxLoader } from 'react-spinners';

function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	console.log(isSuccess && data);

	if (isSuccess) {
		const keys = Object.keys(data);
		//레시피 정보 객체에서 strIngredient 문자로 시작하는 키값만 배열로 뽑음
		const filterKeys1 = keys.filter((key) => key.startsWith('strIngredient'));
		console.log(filterKeys1);
		//위에서 뽑은 키값에서 value값이 빈문자거나 null인것은 제외
		const filterKeys2 = filterKeys1.filter((key) => data[key] !== '' && data[key] !== null);
		console.log(filterKeys2);
		//위에서 뽑은 키 값으로 재료명 value값 뽑기
		const ingredients = filterKeys2.map((key, idx) => ({
			index: idx + 1,
			ingredient: data[key],
			measure: data[`strMeasure${idx + 1}`],
		}));
		console.log(ingredients);
	}

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
		</section>
	);
}

export default Detail;
