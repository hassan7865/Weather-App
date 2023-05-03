import styled from "styled-components"
import Card from './Card'
const Container = styled.div`
    background-color: #68a1b9;
    width:100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

function HomeElem(){
  return (
    <Container>
        <Card/>
    </Container>
  )
}

export default HomeElem