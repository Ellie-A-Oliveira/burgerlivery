import { styled } from "styled-components";
import { colors } from "../../styles/colors";

export const ToastStyled = styled.div`
    background-color: ${colors.background.toast};
    padding: .5rem;
    display: grid;
    grid-template-columns: 60px 1fr;
    align-items: center;
    justify-content: center;
    gap: .25rem;
    border-radius: 8px;
    box-shadow: 0px 4px 16px ${colors.secondary.main};
    
    .icon {
        --size: 1rem;
        width: var(--size);
        height: var(--size);
        line-height: var(--size);
    }
`