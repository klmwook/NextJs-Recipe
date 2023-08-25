import Router from 'next/router';

export const keepStyle = (delay) => {
	Router.events.on('beforeHistoryChange', () => {
		//기존 Style노드를 모두 가져와서 복사 (자식노드까지 포함)
		//link[rel=stylesheet]는 link안에 있는 style을 가져오기 위해 쓴다.
		//style.:not([media=x])는 가져오면 안되기 때문에 not으로 처리
		const nodes = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])');
		const copies = [...nodes].map((el) => el.cloneNode(true));

		//next가 복사한 스타일 노드를 제거하지 못하도록 전용 속성명을 제거
		for (let copy of copies) {
			//static하게 연결되는 스타일 (next 제거안함)
			copy.removeAttribute('data-n-p');
			//dynamic하게 연결되는 스타일 (컴포넌트 언마운트 시 next가 제거)
			copy.removeAttribute('data-n-href');
			document.head.appendChild(copy);
		}

		//일정시간 뒤에 복사된 스타일 노드를 제거하는 함수
		const handler = () => {
			//해당 함수가 실행되면 다시 이벤트 핸들러 제거
			Router.events.off('routeChangeComplete', handler);

			window.setTimeout(() => {
				for (let el of copies) {
					document.head.removeChild(el);
				}
			}, delay);
		};

		//해당 함수를 라우터 변경이 끝나고 delay시간 이후에 실행 됨
		Router.events.on('routeChangeComplete', handler);
	});
};
