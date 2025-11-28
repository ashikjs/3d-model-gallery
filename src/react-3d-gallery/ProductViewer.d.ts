import { ReactNode } from 'react';

export interface ProductViewerProps {
  modelUrl: string;
  height?: string;
  overlay?: ReactNode;
  scrollMultiplier?: number;
}

export default function ProductViewer(props: ProductViewerProps): JSX.Element;
