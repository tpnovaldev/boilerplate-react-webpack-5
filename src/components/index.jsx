import React from 'react';

// Atoms Components
export const Brand = React.lazy(() => import(/* webpackChunkName: "brand" */ './atoms/Brand'));
export const Button = React.lazy(() => import(/* webpackChunkName: "button" */ './atoms/Button'));
export const Container = React.lazy(() => import(/* webpackChunkName: "container" */ './atoms/Container'));
export const Typography = React.lazy(() => import(/* webpackChunkName: "typography" */ './atoms/Typography'));
// Molecules Components
export const Users = React.lazy(() => import(/* webpackChunkName: "users" */ './molecules/Users'));
// Organisms Components
export const Modal = React.lazy(() => import(/* webpackChunkName: "modal" */ './organisms/Modal'));
export const RangeSlider = React.lazy(() => import(/* webpackChunkName: "rangeslider" */ './organisms/RangeSlider'));
export const SpinWheel = React.lazy(() => import(/* webpackChunkName: "spinwheel" */ './organisms/SpinWheel'));
