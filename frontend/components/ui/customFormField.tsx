"use client"
import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from '../forms/PatientForm'
import Image from 'next/image'

import calenderIcon from "@/public/assets/icons/calendar.svg"
import { Select, SelectContent, SelectTrigger, SelectValue } from './select';
import { Textarea } from './textarea';
import { fi } from 'zod/v4/locales';

interface Customprops {
    control : Control<any>,
    fieldType : FormFieldType,
    name :string,
    label? :string,
    placeholder? : string,
    iconSrc? : string,
    iconAlt? :string,
    disabled? : boolean,
    dateFormat? : string,
    showTimeSelect?:boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field : any)=> React.ReactNode
}

const RenderInput = ({field,props}:{field :any ; props:Customprops})=>{
    switch(props.fieldType){
        case FormFieldType.INPUT:
            return(
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {props.iconSrc &&(
                        <Image
                            src = {props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || 'alt'}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            {...field}
                            className='shad-input border-0'
                        />
                    </FormControl>
                </div>
            )

        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput
                        placeholder = {props.placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number || undefined}
                        onChange={field.onChange}
                        className='input-phone'
                    />
                </FormControl>
            )
        
        case FormFieldType.DATE_PICKER :
            return(
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    <Image
                        src={calenderIcon}
                        alt='calender'
                        height={24}
                        width={24}
                        className='ml-2'
                    />
                    <FormControl>
                         <DatePicker 
                            selected={field.value} 
                            onChange={(date) => field.onChange(date)} 
                            dateFormat = {props.dateFormat ?? 'MM/dd/yyyy'} 
                            showTimeSelect = {props.showTimeSelect ?? false}
                            timeInputLabel='Time'
                            wrapperClassName='date-picker'
                          />
                    </FormControl>
                </div>
            )
        
        case FormFieldType.SKELETON :
            return props.renderSkeleton ? props.renderSkeleton(field) : null
            
        case FormFieldType.SELECT :
            return(
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl >
                      <SelectTrigger className='shad-select-trigger'>
                      <SelectValue placeholder ={props.placeholder}/>  
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='shad-select-content'>
                        {props.children}
                    </SelectContent>
                  </Select>
                </FormControl>
            )
        
        case FormFieldType.TEXTAREA :
            return(
                <FormControl>
                   <Textarea
                    placeholder={props.placeholder}
                    {...field}
                    className='shad-textArea'
                    disabled = {props.disabled}
                   />
                </FormControl>
            )
            default :
            break;
    }
}

const customFormField = (props : Customprops) => {
  return (
    <FormField
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <FormItem className='flex-1'>
                {props.fieldType !== FormFieldType.CHECKBOX && props.label &&(
                    <FormLabel>{props.label}</FormLabel>   
                )}
                 <RenderInput
                    field = {field}
                    props = {props}
                 />
                 <FormMessage className='shad-error'/>
            </FormItem>
          )}
        />
  )
}

export default customFormField