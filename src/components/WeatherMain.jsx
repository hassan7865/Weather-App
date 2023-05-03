import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useContext, useState } from 'react';
import { AiOutlineHourglass } from 'react-icons/ai';
import { BsCalendarWeek } from 'react-icons/bs';
import WeatherHourly from './WeatherHourly';
import styled from 'styled-components';
import AppContext from './AppContext';
import WeatherWeekly from './WeatherWeekly';

const Icon = styled.div`
  display: flex;
  gap: 10px;
`
const Icons = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 40%;
  color: white;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
function WeatherMain({data,getIcon,ConvertUnit,getDay}){
    const context = useContext(AppContext)
    const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(context.unit)
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext  value={value}>
        <Box sx={{display:"flex",alignItems:"center" ,justifyContent:"space-between",padding:"0px 10px 0px 10px"}} >
          <TabList sx={{display:"flex",justifyContent:"flex-start",}}   onChange={handleChange} aria-label="lab API tabs example">
            <Tab  icon={<AiOutlineHourglass fontSize="20px"/>}  value="1" />
            <Tab icon={<BsCalendarWeek fontSize="20px"/>}  value="2" />
          </TabList>
          <Icon>
            <Icons type={context.unit} onClick={()=>context.setunit("f")}>°F</Icons>
            <Icons type={context.unit} onClick={()=>context.setunit("c")}>°C</Icons>
          </Icon>
        </Box>
        
        <TabPanel style={{padding:"0"}} value="1"><WeatherHourly ConvertUnit={ConvertUnit}  data={data} getIcon={getIcon}/></TabPanel>
        <TabPanel style={{padding:"0"}} value="2"><WeatherWeekly getDay={getDay} ConvertUnit={ConvertUnit}  data={data} getIcon={getIcon}/> </TabPanel>
      </TabContext>
    </Box>
  );
}
export default WeatherMain