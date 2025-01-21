"use client"

import { useState, useEffect } from 'react';
import { ChevronsUpDown } from 'lucide-react';

export default function TypefaceTitle() {
    const [selectedTypeface, setSelectedTypeface] = useState(1);

    const handleTypefaceChange = (event) => {
      const newTypeface = event.target.value;
      setSelectedTypeface(newTypeface);
  
      // Change the font-family only for the element with ID #title
      const titleElement = document.getElementById("title");
      if (titleElement) {
        titleElement.style.fontFamily = getTypeface(newTypeface);
      }
    };

  const getTypeface = (value) => {
    switch (value) {
      case '1':
        return "'Albert Sans', sans-serif";
      case '2':
        return "'Inter', sans-serif";
      case '3':
        return "'Lora', serif";
      case '4':
          return "'Poppins', sans-serif";
      default:
        return "'Albert Sans', sans-serif";
    }
  };

  return (
      <div className='flex items-center gap-x-1'>
        <select 
        value={selectedTypeface} 
        onChange={handleTypefaceChange} 
        className='typeface py-2 pr-6 pl-2 block w-fit cursor-pointer border rounded-xl text-sm w-fit focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-stone-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
      >
        <option disabled>Typeface</option>
        <option value={1}>Albert Sans *Default</option>
        <option value={2}>Inter</option>
        <option value={3}>Lora *Serif</option>
        <option value={4}>Poppins</option>
      </select>
      <ChevronsUpDown className='opacity-50 h-4 w-4' />
      </div>
  )
}