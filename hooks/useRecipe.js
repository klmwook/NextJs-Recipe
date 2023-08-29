import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${queryKey[1]}`);
	return data?.meals || [];
};

//카테고리명으로 레시피데이터 fetching (추가로 debounce되는 Search 값 가져옴)
export const useRecipeByCategory = (DebounceCategory, DebounceSearch) => {
	return useQuery(['RecipeByCategory', DebounceCategory], getRecipeByCategory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3,
		//Search 값이 비어있을때에만 동작 (사용자가 검색어 요청중이면 카테고리 요청은 중지시키기 위함)
		enabled: DebounceSearch !== undefined,
	});
};

const getRecipeBySearch = async ({ queryKey }) => {
	const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${queryKey[1]}`);
	return data?.meals || [];
};

//검색어로 레시피 데이터 fetching
export const useRecipeBySearch = (DebounceSearch) => {
	return useQuery(['RecipeBySearch', DebounceSearch], getRecipeBySearch, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		//Search 값이 비어있지 않을때만 동작
		enabled: DebounceSearch !== '', //인수로 들어온 input이 빈 문자열이면 실행 불가
	});
};

const getRecipeById = async ({ queryKey }) => {
	const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${queryKey[1]}`);
	//return data.meals !== null ? data.meals[0] : '';
	return data?.meals?.[0] || '';
};

export const useRecipeById = (DebounceId) => {
	return useQuery(['RecipeById', DebounceId], getRecipeById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
	});
};
