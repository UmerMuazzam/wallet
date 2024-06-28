import { setLoading } from '@/redux/features/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { makeToast } from '@/utils/helper';
import axios from 'axios';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react' 

interface Propstype {
  setOpenPopUp: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
}

const Popup = ({ setOpenPopUp, setUpdateTable }:Propstype) => {
    const productData= useAppSelector((state)=> state.productReducer)
    const dispatch= useAppDispatch()
    const [inputData,setInputData]=useState({
        name:productData.name,
        price:productData.price,
        category:productData.category,
    })

    const handleSubmit = (e:FormEvent)=>{
         e.preventDefault();
         dispatch(setLoading(true))

         axios.put(`/api/edit_products${productData._id}`,inputData).then(()=>{
            makeToast("Product updated successfully")
            setUpdateTable((preState) => !preState);
         }).catch((error) => console.log(error))
         .finally(() => {
            dispatch(setLoading(false))
            setOpenPopUp(false)
         })
    }


  return <div>

  </div>;
};

export default Popup
