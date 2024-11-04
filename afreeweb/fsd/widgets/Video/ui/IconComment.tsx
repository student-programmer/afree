'use client';
import React from 'react';
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const IconComment = (props: Partial<CustomIconComponentProps>) => {
  const icon = () => (
		<svg
			width='30'
			height='28'
			viewBox='0 0 30 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M0.599976 5.67579C0.599976 3.04901 2.74337 0.93335 5.37035 0.93335H24.6296C27.2566 0.93335 29.4 3.04901 29.4 5.67579V17.4383C29.4 20.065 27.2566 22.1807 24.6296 22.1807H13.917L8.31653 27.0441C7.62851 27.6416 6.5259 27.1709 6.5259 26.2277V22.1807H5.37035C2.74337 22.1807 0.599976 20.065 0.599976 17.4383V5.67579ZM5.37035 3.06668C3.90632 3.06668 2.73331 4.24242 2.73331 5.67579V17.4383C2.73331 18.8716 3.90632 20.0474 5.37035 20.0474H8.65924V23.9211L13.12 20.0474H24.6296C26.0936 20.0474 27.2666 18.8716 27.2666 17.4383V5.67579C27.2666 4.24242 26.0936 3.06668 24.6296 3.06668H5.37035Z'
				fill='white'
			/>
		</svg>
	);
  return <Icon rev={''} component={icon} {...props} />;
};
