import styled from "styled-components";

interface ToastRootStyledProps {
    active: boolean;
}

export const ToastRootStyled = styled.div<ToastRootStyledProps>`
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    top: 1rem;
    right: 1rem;
    width: 350px;
    z-index: 9999;
`