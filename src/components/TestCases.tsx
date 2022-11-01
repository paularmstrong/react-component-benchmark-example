'use client';
import * as React from 'react';

// This is intentionally slow
// Do not optimize
function slowFibonacci(num) {
	if (num < 2) {
		return num;
	}

	return slowFibonacci(num - 1) + slowFibonacci(num - 2);
}

function getRandomFib() {
	return slowFibonacci(Math.ceil(Math.random() * 3) + 30);
}

function SlowAll() {
	// Running a slow calculation on mount
	const fib = getRandomFib();
	return <div>{JSON.stringify(fib)}</div>;
}

function SlowMount() {
	const fib = React.useMemo(() => getRandomFib(), []);
	return <div>{JSON.stringify(fib)}</div>;
}

function SlowUnmount() {
	React.useEffect(() => {
		return () => {
			// Running a slow calculation on useEffect teardown
			getRandomFib();
		};
	}, []);
	return <div />;
}

function Fast() {
	return <div />;
}

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export function Tree({ breadth = 2, depth = 7, i = 0 }) {
	return breadth > 0 && depth > 0 ? (
		<div
			style={{
				display: 'flex',
				flexDirection: i % 2 ? 'column' : 'row',
				background: colors[(depth + i) % colors.length],
				padding: 4,
				margin: 4
			}}
		>
			{Array.from({ length: breadth }).map((_, i) => (
				<Tree
					key={`${breadth}-${depth}-${i}`}
					breadth={breadth}
					depth={depth - 1}
					i={i}
				/>
			))}
		</div>
	) : null;
}

export default {
	Tree: { component: Tree, props: {} },
	'Slow mount': { component: SlowMount, props: {} },
	'Slow mount & update': { component: SlowAll, props: {} },
	'Slow unmount': { component: SlowUnmount, props: {} },
	'Fast all': { component: Fast, props: {} }
};
