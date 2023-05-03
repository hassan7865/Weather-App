import styled from "styled-components"
import { AiFillCloud, AiOutlineSearch } from 'react-icons/ai'
import { BsThermometerHalf } from "react-icons/bs"
import { IoLocationSharp } from "react-icons/io5"
import cities from 'cities.json';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import WeatherMain from "./WeatherMain";
import AppContext from "./AppContext";
import { mobile, monitor, tablet } from "./Responsive";
const Container = styled.div`
 display: flex;
  width: 85vw;
  height: 90vh;
  border-radius: 20px;
  overflow: hidden;
  ${mobile({
    flexDirection: "column",
    width: "100%",
    height: "100%",
    borderRadius: "0"

})}
${tablet({
     flexDirection: "column",
    width: "100%",
    height: "100%",
    borderRadius: "0"
})}
`
const Left = styled.div`
 flex: 1;
 background-color: #cccaca;
 height: 100%;
 display: flex;
 flex-direction: column;
 ${mobile({
    height: "45%"
})}
${tablet({
     height: "45%"
})}
`
const Right = styled.div`
height: 100%;
flex: 3;
width: 100%;
background-color: white;
${mobile({
    overflow: "scroll",
    padding: "10px 0 10px 0"
})}
${tablet({
      overflow: "scroll",
    padding: "10px 0 10px 0"
})}
${monitor({
    overflow: "scroll"
})}
`
const Search = styled.div`
border: 0.5px solid gray;
height: 25px;
position: relative;
${mobile({
    height: "30px"
})}
${tablet({
    height: "30px"
})}
`
const Form = styled.form`
 height: 100%;
 display: flex;
 align-items: center;
 overflow: hidden;
`
const Input = styled.input`
 height: 100%;
 border: none;
 outline: none;
 padding-left: 5px;
 color: gray;
 width: 92%;
`
const Icon = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 padding:0 5px 0 5px;
 background-color: #5353e2;
 color: white;
 height: 100%;
 width: 8%;
`
const Weather = styled.div`
 display: flex;
 flex-direction: column;
 gap: 10px;
`
const Picture = styled.img`
width: 100%;
height: 150px;
object-fit: cover;

`
const Info = styled.div`
border-bottom: 0.5px solid gray;
`
const DateN = styled.p`
margin: 0;
font-weight: 300;
`
const Temp = styled.h1`
margin: 0;
font-weight: 500;
${mobile({
    fontSize: "18px"
})}
${tablet({
    fontSize: "18px"
})}
`
const Condition = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
`
const Cond = styled.div`
gap: 5px;
font-weight: 300;
display: flex;
align-items: center;
${mobile({
    fontSize: "15px"
})}

`
const Perc = styled.div`
gap: 5px;
font-weight: 300;
display: flex;
align-items: center;
${mobile({
    fontSize: "15px"
})}
${tablet({
    fontSize: "15px"
})}
`
const Bottom = styled.div`
 gap: 5px;
font-weight: 300;
display: flex;
align-items: center;
${mobile({
    fontSize: "15px",
    marginTop: "20px"
})}
${tablet({
    fontSize: "15px",
    marginTop: "20px"
})}
`
const Wrapper = styled.div`
  padding: 40px 10px 40px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  ${mobile({
    padding: "20px 10px 20px 10px"
})}
${tablet({
     padding: "20px 10px 20px 10px"
})}
`
const Result = styled.div`
padding: 3px;
cursor: pointer;
`
const ResultCont = styled.div`
 display: flex;
 flex-direction: column;
 position: absolute;
  width: 100%;
  background-color:white;
  height:max-content;
  margin-top: 5px;
`
const Preload = styled.div`
 background-color: white;
 width: 100%;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
`
const ImageContainer = styled.div`
    display: flex;
    align-self: center;
    margin-top: 10px;
`
const Image = styled.img`
    height: 90%;
    width:90%;
    ${mobile({
    width: "100%",
    height: "100px",
    objectFit: "cover"
})}
${tablet({
    width: "100%",
    height: "100px",
    objectFit: "cover"
})}
`
const Wrap = styled.div`
 ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
})}
${tablet({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
})}
`
function Card() {
    const context = useContext(AppContext)
    const [data, setdata] = useState()
    const [result, setresult] = useState([])
    const [loader, setloader] = useState(false)
    const [info, setinfo] = useState({
        lat: null,
        lng: null,
        country: null,
        name: null
    })

    useEffect(() => {
        const getHour = async () => {
            setloader(true)
            await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${info.lat ? info.lat : 24.8608},${info.lng ? info.lng : 67.0104}?key=CHRAXHYANKEYEKU4V582YAGZS&i&contentType=json`)
                .then((res) => {
                    if (res.status === 200) {
                        setdata(res.data)
                        setloader(false)
                        setresult([])
                    }
                })
        }
        getHour()
    }, [info])
    const handleClick = (e) => {
        e.preventDefault()
        const query = e.target.value
        const find = cities.filter((items) => {
            return (query && (items.name).toLowerCase().startsWith(query.toLowerCase()))
        })
        setresult(find)
    }
    const handleInfo = (lat, lng, name, country) => {
        setinfo({ ...info, lat, lng, name, country })
    }
    function getDay(date) {
        const d = new Date(date)
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const index = d.getDay()
        return (days[index])
    }
    function getIcon(condition) {
        if (condition === "partly-cloudy-day") {
            return 27;
        } else if (condition === "partly-cloudy-night") {
            return 31;
        } else if (condition === "rain") {
            return 22;
        } else if (condition === "clear-day") {
            return 26;
        } else if (condition === "clear-night") {
            return 10;
        }
        else if (condition === "cloudy") {
            return 35;
        }
        else if (condition === "snow") {
            return 23
        }
        else if (condition === "fog") {
            return 2
        }
        else if (condition === "wind") {
            return 1
        }
    }
    function ConvertUnit(unit, temp) {
        if (unit === "f") {
            return (`${temp} °F`)
        }
        else if (unit === "c") {
            const c = (temp - 32) * (5 / 9)
            return (`${(c).toFixed(1)} °C`)
        }
    }
    function time(dt) {
        const hours = dt.getHours(); // gives the value in 24 hours format
        const AmOrPm = hours >= 12 ? 'PM' : 'AM';
        const hour = (hours % 12) || 12;
        const minutes = dt.getMinutes();
        return(`${hour}:${minutes} ${AmOrPm}`)
    }
    return (
        <Container>
            {loader ? <Preload><Loader /></Preload> : <><Left>
                <Wrapper>
                    <Search>
                        <Form onSubmit={(e)=>e.preventDefault()}>
                            <Input onChange={handleClick} placeholder="Search City"></Input>
                            <Icon><AiOutlineSearch /></Icon>
                        </Form>
                        <ResultCont>
                            {result.slice(0, 5).map((items, index) => (
                                <Result onClick={() => handleInfo(items.lat, items.lng, items.name, items.country)} key={index}>{items.name}</Result>
                            ))}
                        </ResultCont>
                    </Search>
                    <Weather>
                        <ImageContainer>
                            <Image alt="Image" src={`/${getIcon(data?.currentConditions.icon)}.png`}></Image>
                        </ImageContainer>
                        <Wrap>
                            <Info>
                                <Temp>{ConvertUnit(context.unit, data?.currentConditions.temp)}</Temp>
                                <DateN>{getDay(new Date)},{time(new Date())}</DateN>
                            </Info>
                            <Condition>
                                <Cond><AiFillCloud size="20px" />{data?.currentConditions.conditions}</Cond>
                                <Perc><BsThermometerHalf size="20px" />{data?.currentConditions.humidity} Humidity</Perc>
                            </Condition>
                        </Wrap>
                    </Weather>
                    <Bottom><IoLocationSharp />{info.name ? info.name : "Karachi"}</Bottom>
                </Wrapper>
            </Left>
                <Right>
                    <WeatherMain getDay={getDay} ConvertUnit={ConvertUnit} data={data} getIcon={getIcon} />
                </Right></>}
        </Container>
    )
}

export default Card