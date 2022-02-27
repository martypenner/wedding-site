import React from 'react';

type Props = React.SVGAttributes<SVGElement>;

export default function GoogleCalendar({ className, ...props }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			className={`${className ?? 'w-6 h-6'}`}
			{...props}
		>
			<path fill="#fff" d="M13 13h22v22H13z" />
			<path
				fill="#1e88e5"
				d="M25.68 20.92l1.008 1.44 1.584-1.152v8.352H30V18.616h-1.44zM22.943 23.745c.625-.574 1.013-1.37 1.013-2.249 0-1.747-1.533-3.168-3.417-3.168-1.602 0-2.972 1.009-3.33 2.453l1.657.421c.165-.664.868-1.146 1.673-1.146.942 0 1.709.646 1.709 1.44 0 .794-.767 1.44-1.709 1.44h-.997v1.728h.997c1.081 0 1.993.751 1.993 1.64 0 .904-.866 1.64-1.931 1.64-.962 0-1.784-.61-1.914-1.418L17 26.802c.262 1.636 1.81 2.87 3.6 2.87 2.007 0 3.64-1.511 3.64-3.368 0-1.023-.504-1.941-1.297-2.559z"
			/>
			<path fill="#fbc02d" d="M34 42H14l-1-4 1-4h20l1 4z" />
			<path fill="#4caf50" d="M38 35l4-1V14l-4-1-4 1v20z" />
			<path
				fill="#1e88e5"
				d="M34 14l1-4-1-4H9a3 3 0 00-3 3v25l4 1 4-1V14h20z"
			/>
			<path fill="#e53935" d="M34 34v8l8-8z" />
			<path
				fill="#1565c0"
				d="M39 6h-5v8h8V9a3 3 0 00-3-3zM9 42h5v-8H6v5a3 3 0 003 3z"
			/>
		</svg>
	);
}
