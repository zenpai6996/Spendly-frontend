import React,{useState} from 'react'
import Input from './input';
import EmojiPickerPopup from './EmojiPickerPopup';
import { LuPlus } from 'react-icons/lu';

const AddIncomeForm = ({onAddIncome}) => {
  
  const [income, setIncome] = useState({
    source:"",
    amount:"",
    date:"",
    icon:"",
  });

  const handleChange = (key , value) => setIncome({...income ,[key] : value});


  return (
    <div>

      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon",selectedIcon)}
      />

      <Input
      value={income.source}
      onChange={({target}) => handleChange("source",target.value)}
      label={"Income Source"}
      placeholder={"Freelance , Salary , etc"}
      type={"text"}
    />
    <Input
      value={income.amount}
      onChange={({target}) => handleChange("amount",target.value)}
      label={"Amount"}
      placeholder={"Enter Income Amount"}
      type={"number"}
    />
    <Input
      value={income.date}
      onChange={({target}) => handleChange("date",target.value)}
      label={"Date"}
      placeholder={""}
      type={"date"}
    />
    <div className='flex justify-end mt-6'>
      <button
        type='button'
        className='add-btn add-btn-fill hover:scale-110 transition-all duration-200 ease-in-out'
        onClick={() => onAddIncome(income)}
      >
       <LuPlus className='font-bold' size={30}/>
      </button>
    </div>
    </div>
  )
}

export default AddIncomeForm