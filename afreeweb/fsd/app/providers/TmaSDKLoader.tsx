'use client';

import type { PropsWithChildren } from 'react';
import { SDKProvider } from '@tma.js/sdk-react';


export function TmaSDKLoader({ children }: PropsWithChildren) {
	return (
		<SDKProvider acceptCustomStyles debug>
			{children}
		</SDKProvider>
	);
}
