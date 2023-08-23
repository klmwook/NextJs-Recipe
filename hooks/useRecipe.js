import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${queryKey[1]}`);
	//해당 커스텀훅으로 훛ㄹ되는 fetching 함수가 만약 컴포넌트 마운트되자마자 호출된다면
	//data값 자체가 없기 때문에 meals에서 undefined 오류 발생을 피하기 위함
	return data.meals;
};

//enabled 예제 : 파라미터를 넣어서 true/false를 지정하여 나오게 안나오게 할 수 있다.
export const useRecipeByCategory = (SelectedCategory) => {
	return useQuery(['RecipeByCategory', SelectedCategory], getRecipeByCategory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 0,
		staleTime: 0,
		retry: 3, //데이터 요청 시도 횟수 (default : 3, 네트워크 상황이 안좋을 때 재시도 횟수 늘림)
		//enabled 값에는 truthy,falsy값이 적용 안됨 (직접 boolean 값을 생성해서 지정)
		//지금 상황에서는 SSG방식으로 초기 데이터를 호출하고 있기 때문에 아래 구문을 지정 안해도 잘 동작 됨
		//CSR 방식으로 호출 할 때에는 초기값이 undefined이기 때문에 발생하는 에러를 미리 방지
		enabled: SelectedCategory !== undefined, //useQuery 호출 유무 true(실행) false(실행 안함)(default : true)
	});
};
