import styled from "styled-components"
import AppContext from "./AppContext"
import { useContext } from "react"
import { mobile } from "./Responsive"
const Container = styled.div`
 display: flex;
 flex-wrap: wrap;
 padding: 0 20px 0 20px;
 gap: 20px;
 justify-content: center;
 ${mobile({
    flexDirection:"column"
 })}
`
const Wrapper = styled.div`
 height: 90px;
 padding: 5px;
 border-radius: 5px;
 width: 120px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content:space-around;
 text-align: center;
 box-shadow: 3px 3px 16px 3px rgba(0,0,0,0.4);
-webkit-box-shadow: 3px 3px 16px 3px rgba(0,0,0,0.4);
-moz-box-shadow: 3px 3px 16px 3px rgba(0,0,0,0.4);
${mobile({
    width:"100%",
    flexDirection:"row",
    padding:"0",
})}
`
const Time = styled.p`
 margin: 0;
 font-size: 15px;
 width: 50px;
`
const Temp = styled.p`
 margin: 0;
 font-size: 15px;
`
const Heading = styled.p`
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
`
const Picture = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    ${mobile({
        width:"60px",
        objectFit:"cover"
    })}
`
function WeatherWeekly({data,getIcon,ConvertUnit,getDay}) {
    const context = useContext(AppContext)
    const weekly = data?.days
    
    return (
        <>
            <Heading>Weelky Weather Forcast</Heading>
            <Container>

                {weekly && weekly.map((items) => (
                    <Wrapper key={items.datetimeEpoch}>
                        <Time>{getDay(items.datetime)}</Time>
                        <Picture alt="Image" src={`/${getIcon(items.icon)}.png`} />
                        <Temp>{ConvertUnit(context.unit, items.temp)}</Temp>
                    </Wrapper>
                ))}
            </Container>
        </>
    )
}
export default WeatherWeekly