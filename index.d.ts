import React from 'react'

declare module 'myt-react-confirm'
 
export interface AnimationProps {
    enter: string;
    exit: string;
}

export interface LabelProps {
    target: React.ReactNode;
    confirm?: React.ReactNode;
    cancel?: React.ReactNode;
}

export type EventCallback<P = any> = (event: P) => void

export type ConfirmPrevent<P extends React.ElementType = "input" | "select" | "textarea"> = EventCallback<P>

export interface ConfirmEvent {
    target: null | React.ReactNode;
    FormData: FormData;
    preventDefault: ConfirmPrevent;
}
 
export interface ConfirmProps<AS extends React.ElementType = 'button'> {
    as?:        AS;
    label:      React.ReactNode | LabelProps;
    message?:   string; 
    animation?: AnimationProps;
    onConfirm?: EventCallback<ConfirmEvent>;
    onCancel?:  EventCallback; 
    timing?:    number;
    placement?: "top"|"bottom"|"left"|"right"|"top-left"|"top-right"|"bottom-left"|"bottom-right" 
    children?:   React.ReactNode; 
    stayMountedWhenExited?:   boolean;
}

declare const Confirm: React.FunctionComponent<ConfirmProps>

export default Confirm 