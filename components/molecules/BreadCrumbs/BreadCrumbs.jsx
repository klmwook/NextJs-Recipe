import { Text } from '@/components/atoms/text/Text';
import styles from './BreadCrumbs.module.scss';
import clsx from 'clsx';
import React from 'react';

function BreadCrumbs({ data }) {
	return (
		<nav className={clsx(styles.breadcrumbs)}>
			{data.map((name, idx) => {
				//맨 처음에 있는 문자만 대문자로 치환
				name = name.replace(/\b[a-z]/, (letter) => letter.toUpperCase());

				//현재 반복되는 메뉴 순번이 마지막이 아닐때 뒤에 슬러스 붙이고 링크 추가
				if (idx !== data.length - 1) {
					return (
						<React.Fragment key={idx}>
							<Text tag={'em'} url={`/${name}`} style={{ color: 'white' }}>
								{!name ? 'Home' : name}
							</Text>
							<span style={{ color: 'white' }}> / </span>;
						</React.Fragment>
					);
				} else {
					//마지막 순번이면 글자만 생성
					//마지막 데이터에서 쿼리스트링 값이 있으면 (=이 있으면)뒤에 레시피 아이디가 아닌 레시피명을 출력
					//빈칸 처리되는 정규표현식을 빈칸으로 대치 (%20 -> ' ')해서 문자열 출력
					return (
						<Text tag={'strong'} style={{ color: 'white' }} key={idx}>
							{name.includes('=')
								? name.split('=')[1].replaceAll('%20', ' ')
								: name}
						</Text>
					);
				}
			})}
		</nav>
	);
}

export default BreadCrumbs;
