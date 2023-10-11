import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react';

export interface PlanetButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement>{
    title: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
