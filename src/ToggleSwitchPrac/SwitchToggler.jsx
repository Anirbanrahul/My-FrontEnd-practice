import {useState} from 'react'
import { Switch } from './ReusableSwitch/Switch';


const SwitchToggler = () => {
const [toggle, setToggle] = useState(false);

const onChangeToggle = (val)=>{
  setToggle(!val);
}
  return (
    <>
        <Switch value={toggle} onChange={onChangeToggle} label={'Dark Mode'}/>
    </>
  )
}

export default SwitchToggler