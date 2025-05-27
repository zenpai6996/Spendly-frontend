import React , {useState} from 'react'
import Input from './input';
import EmojiPickerPopup from './EmojiPickerPopup';
import { LuPlus } from 'react-icons/lu';

const AddExpenseForm = ({onAddExpense}) => {
  
  const [expense, setExpense] = useState({
    category:"",
    amount:"",
    date:"",
    icon:"",
  });

  const handleChange = (key , value) => setExpense({...expense ,[key] : value});


  return (
    <div>

      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon",selectedIcon)}
      />

      <Input
      value={expense.category}
      onChange={({target}) => handleChange("category",target.value)}
      label={"Expense Category"}
      placeholder={"Rent , Shopping , etc"}
      type={"text"}
    />
    <Input
      value={expense.amount}
      onChange={({target}) => handleChange("amount",target.value)}
      label={"Amount"}
      placeholder={"Enter Expense Amount"}
      type={"number"}
    />
    <Input
      value={expense.date}
      onChange={({target}) => handleChange("date",target.value)}
      label={"Date"}
      placeholder={""}
      type={"date"}
    />
    <div className='flex justify-end mt-6'>
      <button
        type='button'
        className='add-btn add-btn-fill hover:scale-110 transition-all duration-200 ease-in-out'
        onClick={() => onAddExpense(expense)}
      >
       <LuPlus className='font-bold' size={30}/>
      </button>
    </div>
    </div>
  )
}

export default AddExpenseForm;