import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'


const filterData = [
    {
        filterType:"Type of Employment",
        array:["Full Time","Part Time","Internship","Freelance","Remote","Co-founder"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer", "Backend Developer","Full Stack Developer","Dapp Developer","Content Creator","Video Editor","Web3 Developer","Solana Developer","Game Developer","Product Designer","Passinate Programmer"]
     },

    {
        filterType:"Location",
        array:["Delhi NCR", "Bengaluru","Pune","Nagpur","USA","Hyderabad","Mumbai"]
    },
    {
        filterType:"Salary",
        array:["0-40k","42-1Lakh","1Lakh to 10Lakh","20Lakh to 30Lakh","50Lakh and Above"]
    }
    
 ]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard


