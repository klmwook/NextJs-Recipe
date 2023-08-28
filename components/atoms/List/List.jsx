import styles from './List.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

//React.createElement(요소명, {className, style, href}, children)
//React.createElement(요소명, {className, style, href}, React.createElement():map으로 반복 처리 가능)

function List({ style, className, data, tag = 'ul', url }) {
	return React.createElement(
		tag,
		{ className: clsx(styles.list, className), style: style },
		data.map((el, idx) => {
			const child = tag === 'ol' ? `${idx + 1}. ${el}` : el;
			return React.createElement(
				'li', //요소명
				{ key: idx }, //props
				//li의 자식 요소 (url있으면 Link컴포넌트 추가, 없으면 그냥 글자만)
				url ? React.createElement(Link, { href: `${url[idx]}` }, child) : child
			);
		})
	);
}

export default List;
