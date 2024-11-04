'use client';
import React from 'react';
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const IconShare = (props: Partial<CustomIconComponentProps>) => {
  const icon = () => (
		<svg
			width='26'
			height='22'
			viewBox='0 0 26 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M13.4535 3.21114V8.27398L12.4922 8.3694C7.74919 8.8402 3.85756 12.2095 2.61265 16.6804C5.31287 14.4882 8.83617 13.334 12.4907 13.6913L13.4535 13.7855V18.7887L23.1895 10.9999L13.4535 3.21114ZM11.3202 2.29325C11.3202 0.874348 12.9615 0.0855088 14.0695 0.971885L24.9528 9.67854C25.7995 10.356 25.7995 11.6438 24.9528 12.3213L14.0695 21.0279C12.9615 21.9143 11.3202 21.1255 11.3202 19.7066V15.7615C7.7268 15.7165 4.36166 17.3844 2.19378 20.12C1.52153 20.9683 0.0311941 20.5581 0.0671681 19.347C0.260961 12.8223 5.05616 7.4544 11.3202 6.37669V2.29325Z'
				fill='white'
			/>
		</svg>
	);
  return <Icon rev={''} component={icon} {...props} />;
};
