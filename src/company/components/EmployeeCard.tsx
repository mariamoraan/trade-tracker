import { useEffect, useState } from "react"
import styled from "styled-components"
import { IUser, getUser } from "../../auth/utils/user"

const Wrapper = styled.div``
const Name = styled.p``

export const EmployeeCard = ({employeeId}: {employeeId: string}) => {
    const [employee, setEmployee] = useState<IUser | null>(null)
    useEffect(() => {
        const getAsyncEmployer = async() => {
            const res = await getUser(employeeId)
            setEmployee(res)
        }
        getAsyncEmployer()
    })
    if (!employee) return null
    return (
        <Wrapper>
            <Name>{employee.name}</Name>
        </Wrapper>
    )
}