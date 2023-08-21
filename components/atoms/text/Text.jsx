import React from 'react';
import Link from 'next/link';
import styles from './Text.module.scss'; //css모듈
import clsx from 'clsx';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';
import { useRouter } from 'next/router';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum',
	//block (default) : 외부폰트가 준비안되어있을 때 해당 Text 숨김 처리
	//swap : 외부폰트 준비가 안되었을때 일단은 기본 system 폰트를 fallback 처리해서 보임 처리
	display: 'swap',
	//레이아웃의 최적화를 위해서 자동으로 fallback (대체폰트 출력) 기능 실행
	adjustFontFallback: false,
});
const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-orbitron',
	display: 'swap',
	adjustFontFallback: false,
});

function Text({ children, url, style, className, type, tag = 'p', isOn = false }) {
	//next/useRouter 훅으로 부터 객체를 반환받고
	const router = useRouter();
	//해당 객체에 있는 pathname값 가져오기 (현재 활성회되어있는 라우터 명)
	const currentPath = router.pathname;

	//컴포넌트 이름, 디폴트 태그명
	return React.createElement(
		tag,
		{
			className: clsx(
				//현재 라우터명과 url로 가져온 라우터명이 동일하면 on 클래스 추가
				currentPath === url ? styles.on : '',
				styles.txt, //클래스명
				className,
				nanum.variable,
				orbitron.variable,
				styles[`txt_${type}`], //추가 클래스명
				isOn && styles.on //전달되는 boolean값에 따라 고유클래스 on추가, module.sass가 자체적으로 고유클래스명으로 변환하기 때문에 부모의 클래스명을 내부 전용 css에 연결하는게 불가
			),
			style: url ? style : { ...style, transitionDuration: '0.5s' },
			onMouseEnter: (e) => (e.target.style.color = style?.hoverColor),
			onMouseLeave: (e) => (e.target.style.color = style?.color),
		},
		url
			? React.createElement(
					Link,
					{
						href: url,
						style: { transitionDuration: '0.5s' },
					},
					children
			  )
			: children
	);
}

export default Text; //컴포넌트명
