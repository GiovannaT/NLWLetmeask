//type ButtonProps = {
//    children?: string;//opcional}

//export function Button(props: ButtonProps) {
//    return (
//        <button>{props.children || 'Default'}</button>)}
import { ButtonHTMLAttributes } from 'react'
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export function Button(props: ButtonProps) {
    //coloca todas as props no botão de retorno
    return (
        <button className="button"{...props}></button>
    )
}
