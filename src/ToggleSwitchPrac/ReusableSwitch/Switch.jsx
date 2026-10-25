import './switch.css'

// eslint-disable-next-line react/prop-types
export const Switch = ({value, onChange=()=>{}, label=''}) => {
  return (
    <>
    <div className="switch">
      <label>
        <input type="checkbox" name="checkBox" id="" className="checkbox" checked={value} onChange={()=>onChange(value)}/>
        <div className="slider"></div>
        {label}
      </label>
    </div>
    </>
  )
}
