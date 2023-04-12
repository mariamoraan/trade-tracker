import styled from "styled-components";

const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
`

const Text = styled.p<{isActive: boolean}>`
    font-size: 12px;
    color: ${props => props.isActive ? 'var(--accent-color)' : 'var(--secondary-color)'};
    transition: 200ms ease;
    font-weight: bold;
    text-transform: uppercase;
`

const NumberWrapper = styled.div<{figureNumber: number}>`
    padding: 0 1ch;
    width: ${props => props.figureNumber}ch;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: var(--accent-color);
    color: var(--primary-color-light);
`

const Number = styled.p`
    font-size: 0.7rem;
`

interface IFilter {
    text: string,
    onClick: () => void,
    isActive: boolean,
    itemsNumber: number,
}

export const Filter = (props: IFilter) => {
    const {text, onClick, isActive, itemsNumber} = props
    return (
        <FilterWrapper onClick={onClick}>
            <Text isActive={isActive}>{text}</Text>
            <NumberWrapper figureNumber={itemsNumber.toString().length}><Number>{itemsNumber}</Number></NumberWrapper>
        </FilterWrapper>
    )
}