import type * as React from 'react';

type CustomElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
type TonyButtonElementProps = CustomElementProps & {
  variant?: 'primary' | 'outline' | 'ghost';
  type?: 'button' | 'submit';
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mfe-analytics-root': CustomElementProps;
      'ton-button-wc': TonyButtonElementProps;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'mfe-analytics-root': CustomElementProps;
      'ton-button-wc': TonyButtonElementProps;
    }
  }
}

export {};
