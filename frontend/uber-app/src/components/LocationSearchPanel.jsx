/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import 'remixicon/fonts/remixicon.css'

export default function LocationSearchPanel(props) {
    const suggestions=props.suggestions;
    const Handlechange=(v)=>{
        if(props.activeField == 'pickup'){
            props.setPickup(v)
        }
        if(props.activeField == 'destination'){
            props.setDestination(v);
        }
    }
  return (
    <div>
        {
            suggestions.map((suggestion, index) => (
                <div key={index} 
                  onClick={() => Handlechange(suggestion.description)}
                  className="flex gap-4 items-center my-2 justify-start ml-5 py-5 px-1 border-gray-100 border-2 focus:border-black active:border-black p-2 rounded-md">
                  <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
                    <i className="ri-map-pin-fill"></i>
                  </h2>
                  <h4 className="text-lg font-medium">{suggestion.description}</h4>
                </div>
              ))
              
        }
    </div>
  )
}
