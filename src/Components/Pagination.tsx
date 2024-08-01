import React from 'react'
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import './style.scss'
import { Character } from '../types';
interface Props{
    isPreviousDisabled:boolean,
    isNextDisabled:boolean,
    pageNumber: number,
    setPageNumber:React.Dispatch<React.SetStateAction<number>>,
    
}
const Pagination:React.FC<Props> = ({isPreviousDisabled,isNextDisabled,pageNumber,setPageNumber}) => {
  return (
    <div className='pagination'>
        <button disabled={isPreviousDisabled} onClick={() => setPageNumber(pageNumber - 1)}><GoArrowLeft /></button>
        <label>{pageNumber}</label>
        <button disabled={isNextDisabled} onClick={() => setPageNumber(pageNumber + 1)}><GoArrowRight /></button>
      </div>
  )
}

export default Pagination
