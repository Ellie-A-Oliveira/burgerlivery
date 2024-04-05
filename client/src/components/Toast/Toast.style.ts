import { styled } from "styled-components";
import { colors } from "../../styles/colors";

export const ToastStyled = styled.div`
    background-color: ${colors.background.toast};
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;
    border-radius: 8px;
    box-shadow: 0px 4px 16px ${colors.secondary.main};
    
    .icon {
        --size: 1.5rem;
        width: var(--size);
        height: var(--size);
    }
`