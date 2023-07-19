"use client"
import {
    Button,
    Carousel,
    IconButton,
} from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import GeneralCardProduct from './GeneralCardProduct'
import useSWR, { preload } from 'swr'
import { getTodos } from '../api/todoApi'
import { FETCHING_TODO } from '../utils/SWRkey'
import GeneralBlankCardProduct from './GeneralBlankCardProduct'

const HorizontalProductList = ({ listProductData }) => {

    const[finalChunks,setFinalChunks] =  useState([[]]) 

    const generateChunks = (inList = [], chunkSize) => {
        
        var outList = new Array() //2d
        var tmpList = new Array()

        var counter = 0; 
        var current = 0

        console.log("JUMLAH LIST PRODUK : " , inList)
        console.log("Item yang ditampilkan per slide : " + chunkSize)
 
        for (current; current < inList.length; current++) {
            if (counter != chunkSize) {
                tmpList.push(inList[current])
                counter++;  
            } 
            if (counter == chunkSize || current == inList.length - 1) {  
                outList.push(tmpList); 
                counter = 0;
                tmpList = []
            }
            console.log("==================================================")
        } 
       
        // console.log("DATA YANG DITAMPILKAN 1: " , outList)

        while (outList[outList.length - 1].length < chunkSize) {
            outList[outList.length - 1].push(null);
        }
       
        console.log("DATA YANG DITAMPILKAN 2: " , outList)
        
        setFinalChunks(outList)
        // return outList;
    }
 
    useEffect(() => { 
        generateChunks(listProductData,5) 
        console.log("HALO====")        
    }, [])



    return ( 
        <div>
            <Carousel className='bg-deep-orange-600 py-9'
                prevArrow={({ handlePrev }) => (
                    <IconButton
                        style={{ backgroundColor: 'blue' }}
                        size="lg"
                        onClick={handlePrev}
                        className=" rounded-full !absolute top-2/4 -translate-y-2/4 left-4">
                        <i className="fa fa-chevron-left" />
                    </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                    <IconButton
                        style={{ backgroundColor: 'blue' }}
                        size="lg"
                        onClick={handleNext}
                        className=" rounded-full !absolute top-2/4 -translate-y-2/4 right-4">
                        <i className="fa fa-chevron-right" />
                    </IconButton>
                )}
                navigation={(navigation)=>{}}
            >
                {
                    finalChunks.map((data, index) => {
                        return (
                            <div className='flex flex-row space-x-5 px-12'>
                                {
                                    data.map((data2,index2)=>{
                                        return(
                                            data2 != null ?
                                            <GeneralCardProduct props={data2}/>
                                            :
                                            <GeneralBlankCardProduct/>
                                            
                                        )
                                        
                                    })
                                    
                                }

                            </div>
                        )
                    })
                }

                {/* <div className='flex flex-row space-x-5 px-12'>
                    <GeneralCardProduct />
                    <GeneralCardProduct />
                    <GeneralCardProduct />
                    <GeneralCardProduct />
                    <GeneralCardProduct />
                </div>

                <div className='flex flex-row space-x-5 px-12'>
                    <GeneralCardProduct />
                    <GeneralCardProduct />
                    <GeneralCardProduct />
                    <GeneralCardProduct />
                    <GeneralCardProduct />
                </div> */}
            </Carousel>
        </div>
    )
}

export default HorizontalProductList