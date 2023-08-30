import { Text } from '@/components/atoms/text/Text';
import styles from './BreadCrumbs.module.scss';
import clsx from 'clsx';
import React from 'react';

function BreadCrumbs({ data, isActive }) {
	return (
		//IsActive값이 true 일때에만 on클래스 추가
		<nav className={clsx(styles.breadcrumbs, isActive ? styles.on : '')}>
			{data.map((name, idx) => {
				//맨 처음에 있는 문자만 대문자로 치환
				//name = name.replace(/\b[a-z]/, (letter) => letter.toUpperCase());

				//result : '-'로 연결되어 있는 문자값을 빈칸으로 치환하고 각 단어의 앞글자만 대문자로 리턴
				const result = name.includes('-')
					? name
							// -으로 문자열 분리
							.split('-')
							//분리된 문자열을 다시 첫번째만 잘라서 대문자 변경 + 첫문자만 제외한 나머지 문자값 반환해서 하나로 붙이기
							.map((txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
							.join(' ')
					: name;

				//result2 : '=' 있을때 처리
				const result2 = result.includes('=')
					? result.split('=')[1].replaceAll('%20', ' ')
					: result;

				//현재 반복되는 메뉴 순번이 마지막이 아닐때 뒤에 슬러시 붙이고 링크 추가
				if (idx !== data.length - 1) {
					return (
						<React.Fragment key={idx}>
							{/* 텍스트가 없을 때 home으로 치환 있으면 위에서 가공한 result 적용 */}
							<Text tag={'em'} url={`/${name}`} style={{ color: 'white' }}>
								{!result ? 'Home' : result}
							</Text>
							<span style={{ color: 'white' }}> / </span>
						</React.Fragment>
					);
				} else {
					//마지막 순번이면 글자만 생성
					//마지막 데이터에서 쿼리스트링 값이 있으면 (=이 있으면)뒤에 레시피 아이디가 아닌 레시피명을 출력
					//빈칸 처리되는 정규표현식을 빈칸으로 대치 (%20 -> ' ')해서 문자열 출력
					return (
						<Text tag={'strong'} style={{ color: 'white' }} key={idx}>
							{/* 가공된 result을 바로 활용해서 해당 result값에서 =있으면 가공처리 없으면 그냥 result값 활용 */}
							{result2}
						</Text>
					);
				}
			})}
		</nav>
	);
}

export default BreadCrumbs;
