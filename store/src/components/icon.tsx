/** @format */

import React from "react";

interface IIcon {
	child: React.ReactElement;
	fill?: number;
	wght?: number;
	grad?: number;
	opsz?: number;
	className?: string;
}

export default function Icon({
	children,
	fill = 0,
	wght = 100,
	grad = 0,
	opsz = 48,
	className
}: IIcon) {
	return (
		<div
			style={{
				fontVariationSettings: `'FILL' ${fill}, 'wght' ${wght}, 'GRAD' ${grad}, 'opsz' ${opsz};`
			}}
			className={className}>
			<span class='material-symbols-outlined'>{children}</span>
		</div>
	);
}
