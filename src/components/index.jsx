import { lazy } from 'react';

export const Button = lazy(() => import(/* webpackChunkName: "Button" */ './Button'));
export const Logos = lazy(() => import(/* webpackChunkName: "Logos" */ './Logos'));
export const Typography = lazy(() => import(/* webpackChunkName: "Typography" */ './Typography'));
export const Users = lazy(() => import(/* webpackChunkName: "Users" */ './Users'));
