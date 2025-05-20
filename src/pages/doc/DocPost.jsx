import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  const values = [
    {
        atribute: "Dimensi",
        komponen: "Panjang * Lebar",
        value: "4:5"
    },{
      atribute: "Typeface/Font",
      komponen: "Albert Sans",
      value: "https://fonts.google.com/specimen/Albert+Sans"
    },{
        atribute: "Title",
        komponen: "text-2xl",
        value: "1.5rem/24px"
    },{
        atribute: "Sub Title",
        komponen: "text-sm",
        value: "0.875rem/14px"
    },{
        atribute: "Deskripsi",
        komponen: "text-base",
        value: "1rem/16px"
    },{
        atribute: "Color",
        komponen: "Base",
        value: "#E74C3C"
    },{
        atribute: "Color",
        komponen: "Gradient",
        value: "#E74C3CFF to #E74C3C00"
    },{
        atribute: "Color",
        komponen: "Text",
        value: "#000000"
    },{
        atribute: "Logo",
        komponen: "Size",
        value: "(110px * 29px) * 2.16 "
    }
  ]

export default function DocPost() {
  return (
    <div className='pb-24'>
      <Table>
      <TableCaption>A list of your recent values.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Atribut</TableHead>
          <TableHead>Komponen</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {values.map((value) => (
          <TableRow key={value.value}>
            <TableCell className="font-medium">{value.atribute}</TableCell>
            <TableCell>{value.komponen}</TableCell>
            <TableCell>{value.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}
