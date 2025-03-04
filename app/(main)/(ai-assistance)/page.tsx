"use client";
import { Button } from '@/components/ui/button'
import AiAssistantsList from '@/services/AiAssistantsList'
import React, { useState } from 'react';
import Image from 'next/image';
import { Checkbox } from "@/components/ui/checkbox"
import { Assistant } from 'next/font/google';


export type Assistant = {
    id: number;
    name: string;
    title: string;
    image: string;
    instruction: string;
    userInstruction: string;
    sampleQuestions: string[];
}


const AiAssistance = () => {
    const [selectedAsistant, setSelectedAsistant] = useState<Assistant[]>([]);

    const onSelectAssistant = (assistant:Assistant) => { 
        const item = selectedAsistant.find((item: Assistant) => item.id == assistant.id);
        if (item) {
            setSelectedAsistant(selectedAsistant.filter((item: Assistant) => item.id !== assistant.id));
            return;
        }
        setSelectedAsistant([...selectedAsistant, assistant]);
    }

    const isAssistantSelected = (assistant:Assistant) => {
        const item = selectedAsistant.find((item: Assistant) => item.id == assistant.id);
        return !!item;
    }
  return (
      <section className="max-w-7xl mx-auto w-full">
          <div className="mt-20">
              <div className="flex flex-col md:flex-row items-center md:justify-between px-5 space-y-2">
                  <div className="flex flex-col space-y-4">
                  <h1 className="text-2xl font-bold font-stretch-125% ">Welcome to the world of <span className="font-bold bg-gradient-to-r from-blue-100 to to-blue-600 bg-clip-text text-transparent text-3xl">Ai</span> <span className="text-4xl">🦿</span></h1>
                      <p className="text-md text-gray-500">Select a companion to make your task easieer</p>
                  </div>
                  <Button variant={"default"} className="ring-2 ring-blue-500 hover:bg-gradient-to-r from-blue-50 to-blue-400 transition-all duration-300">Let's Go</Button>
              </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10 transition-all duration-300 ease-in-out cursor-pointer ">
              {AiAssistantsList.map((assistant, index) => (
                  <div key={index} className="flex flex-col space-y-2 items-center p-4 hover:border-gray-500 hover:shadow-lg hover:rounded-lg relative" onClick={() => onSelectAssistant(assistant)}>
                      <Checkbox className="absolute left-3 font-bold m-3 bg-white dark:text-black" checked={isAssistantSelected(assistant)} />

               <Image 
                 src={assistant.image} 
                 alt={assistant.name} 
                 width={400} 
                 height={400}
                 className="rounded-md w-full h-[200px] hover:shadow-lg transition-all duration-300 hover:border-b-2 border-gray-300" 
                 objectFit="cover"
                      />
                      <h2 className="text-lg font-extrabold">{assistant.name}</h2>
                      <h2 className="font-extralight">{assistant.title}</h2>
             </div>
             
              ))}
          </div>
   </section>
  )
}

export default AiAssistance;
