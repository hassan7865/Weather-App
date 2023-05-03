import { useContext } from "react"
import styled from "styled-components"
import AppContext from "./AppContext"
import { mobile } from "./Responsive"
const Container = styled.div`
 display: flex;
 flex-wrap: wrap;
 padding: 0 20px 0 20px;
 gap: 20px;
 justify-content: center;
 position: relative;
 ${mobile({
    flexDirection:"column",
 })}
`
const Wrapper = styled.div`
 height: 85px;
 padding: 5px;
 border-radius: 5px;
 width: 70px;
 display: flex;
 flex-direction: column;
 align-items: center;
 box-shadow: 3px 3px 16px 3px rgba(0,0,0,0.4);
 justify-content: space-around;
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
    width:90%;
    height:50px;
    object-fit:cover;
    ${mobile({
        width:"60px",
        objectFit:"cover"
    })}
`
function WeatherHourly({data,getIcon,ConvertUnit}){
    const context = useContext(AppContext)
    const hourly = data && data.days[0]
    function time(t) {
        const hour = t.slice(0,2)
        const unit = hour > 12 ? "PM" : "AM"
       const d = hour % 12 || 12
       return (`${d}:00 ${unit}`)
    }
    return(
        <>
        <Heading>Hourly Weather For Today</Heading>
        <Container>
            
            {hourly && hourly.hours.map((items)=>(
            <Wrapper key={items.datetimeEpoch}>
                <Time>{time(items.datetime)}</Time>
               <Picture alt="Image" style={{}}src={`/${getIcon(items.icon)}.png`}/>
                <Temp>{ConvertUnit(context.unit,items.temp)}</Temp>
            </Wrapper>
            ))}
        </Container>
        </>
    )
}
export default WeatherHourly