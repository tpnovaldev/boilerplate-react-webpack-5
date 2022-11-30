import React from 'react';

// Atom Components
export const Brand = React.lazy(() => import(/* webpackChunkName: "brand" */ './atoms/Brand'));
export const Button = React.lazy(() => import(/* webpackChunkName: "button" */ './atoms/Button'));
export const Container = React.lazy(() => import(/* webpackChunkName: "container" */ './atoms/Container'));
export const Typography = React.lazy(() => import(/* webpackChunkName: "typography" */ './atoms/Typography'));
// Molecule Components
export const Navigation = React.lazy(() => import(/* webpackChunkName: "navigation" */ './molecules/Navigation'));
export const Users = React.lazy(() => import(/* webpackChunkName: "users" */ './molecules/Users'));
// Organism Components
export const Header = React.lazy(() => import(/* webpackChunkName: "header" */ './organisms/Header'));
export const Modal = React.lazy(() => import(/* webpackChunkName: "modal" */ './organisms/Modal'));
export const RangeSlider = React.lazy(() => import(/* webpackChunkName: "rangeslider" */ './organisms/RangeSlider'));
export const SpinWheel = React.lazy(() => import(/* webpackChunkName: "spinwheel" */ './organisms/SpinWheel'));
// Template Components
export const BaseLayout = React.lazy(() => import(/* webpackChunkName: "baselayout" */ './templates/BaseLayout'));
export const AuthLayout = React.lazy(() => import(/* webpackChunkName: "authlayout" */ './templates/AuthLayout'));
