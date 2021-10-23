import React from "react";

export interface ITooltipProps {
    text: string
    children: React.ReactNode
}

type StyleType = React.CSSProperties

export interface ITooltipStyles {
    container: StyleType
    tooltip: StyleType
}