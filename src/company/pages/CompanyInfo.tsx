import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { useAppSelector } from "../../redux/hooks"
import { selectCompanyEmployees, selectCompanyName } from "../../redux/reducers/companyReducer"
import { EmployeeCard } from "../components/EmployeeCard"

const Wrapper = styled.div`

`
const Title = styled.h2``

const Subtitle = styled.p`
    color: var(--secondary-color);
`
const ElemWrapper = styled.div`
    margin: 24px 0;
`
const ElemTitle = styled.h3`
    margin-bottom: 8px;
`

const EmployeesWrapper = styled.div`
    dsplay: flex;
    gap: 24px;
`

const CompanyInfo = () => {
    const {t} = useTranslation()
    const companyName = useAppSelector((state) => selectCompanyName(state.company))
    const employees = useAppSelector((state) => selectCompanyEmployees(state.company))
    return (
        <Wrapper>
            <Title>{t("company_panel")}</Title>
            <Subtitle>{companyName}</Subtitle>
            <ElemWrapper>
                <ElemTitle>{t("company_employees")}</ElemTitle>
                <EmployeesWrapper>
                    {
                        employees.map((employee) => (
                            <EmployeeCard employeeId={employee} key={employee} />
                        ))
                    }
                </EmployeesWrapper>
            </ElemWrapper>
        </Wrapper>
    )
}

export default CompanyInfo