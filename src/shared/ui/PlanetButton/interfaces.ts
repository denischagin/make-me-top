import React, { ButtonHTMLAttributes } from 'react';

export interface PlanetButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement>{
    title: string;
    onClick?: () => void;
}
