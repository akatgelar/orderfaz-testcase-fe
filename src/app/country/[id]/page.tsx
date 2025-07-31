'use client'

import { use, useEffect, useRef, useState } from "react";
import { CountryModel } from '@/models/CountryModel';
import Link from "next/link"; 

type callingcodeModel = {
  name: string
}
  
type curencyModel = {
  name: string
}

export default function Detail({params}: {params: Promise<{ id: string }>}) {
  const initializedOverview = useRef(false)
  const { id } = use(params) 

  const [countryData, setCountryData] = useState<CountryModel>();

  useEffect(() => { 
    if (!initializedOverview.current) {
      initializedOverview.current = true 
      detailCountry(id);
    }  
  });

  async function detailCountry(country: string) {  
    const res = await fetch('https://restcountries.com/v3.1/name/'+country+'?fullText=true', {headers: {}})
    const data = await res.json();  
    const temp = data[0];

    const callingcode = data[0].idd.root.replace('+', '') + data[0].idd.suffixes[0];
    console.log(callingcode)
    temp['callingcode'] = callingcode
    temp['callingcodeList'] = await getCallingcode(callingcode)

    const currency = Object.keys(data[0].currencies)[0];
    console.log(currency)
    temp['currency'] = currency
    temp['currencyList'] = await getCurrency(currency)

    console.log(temp)
    setCountryData(temp);
  }

  async function getCallingcode(callingcode: string) {
    const temp: string[] = [];
    const resCallingcode = await fetch('https://restcountries.com/v2/callingcode/'+callingcode, {headers: {}})
    const dataCallingcode = await resCallingcode.json();   
    if (dataCallingcode.length > 0) {
      dataCallingcode.forEach((row:callingcodeModel) => {
        temp.push(row.name)
      }); 
    }
    return temp;
  }

  async function  getCurrency(currency: string) {
    const temp: string[] = []; 
    const resCurrency = await fetch('https://restcountries.com/v2/currency/'+currency, {headers: {}})
    const dataCurrency = await resCurrency.json();   
    if (dataCurrency.length > 0) {
      dataCurrency.forEach((row:curencyModel) => {
        temp.push(row.name)
      }); 
    }
    return temp;
  }


  return (
    <div className="bg-lightgrey font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col row-start-2"> 

        <div className="mt-1 flex items-center gap-3 mb-4">
          <Link href="/" className="bg-purple-500 hover:bg-purple-600 flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="ffffff" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M20.0002 11.2534L20.0774 11.2573C20.4555 11.2957 20.7502 11.6151 20.7502 12.0034C20.7502 12.3917 20.4555 12.711 20.0774 12.7495L20.0002 12.7534H3.99927C3.58505 12.7534 3.24927 12.4176 3.24927 12.0034C3.24927 11.5891 3.58505 11.2534 3.99927 11.2534H20.0002Z" fill="#ffffff"/>
            <path d="M9.4651 5.46967C9.75791 5.17691 10.2327 5.17696 10.5256 5.46967C10.8184 5.76248 10.8184 6.2373 10.5256 6.53022L5.05885 11.9999L10.5256 17.4697L10.5774 17.5263C10.8177 17.8209 10.8002 18.2556 10.5256 18.5302C10.251 18.8047 9.81624 18.8222 9.52174 18.582L9.4651 18.5302L3.469 12.5302C3.17634 12.2374 3.17635 11.7625 3.469 11.4697L9.4651 5.46967Z" fill="#ffffff"/>
            </svg>
            Back to Homepage
          </Link>
        </div>
        {
          countryData
          ?
            <div>
              <div className="flex flex-root"> 
                <h1 className="text-xl font-semibold mb-2 items-center justify-center mr-2">{countryData.name.common}</h1>
                <h1 className="text-xl font-semibold mb-2 items-center justify-center mr-2">{countryData.flag}</h1> 
              </div>

              <div className="flex flex-root"> 
                {
                  countryData.altSpellings.map((item, index) => (
                    <span key={index} className="inline-flex items-center justify-center gap-1 rounded-full bg-green-500 px-2.5 py-0.5 text-sm font-medium text-white mr-2">{item}</span>
                  ))
                }
              </div>

              <div className="flex flex-root mt-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 mr-4">
                  <h4>LatLong</h4>
                  <h1 className="mt-2 text-4xl font-bold text-purple-800 ">{countryData.latlng.join(', ')}</h1>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
                  <div className="flex"><h4>Capital : </h4> <h4>{countryData.capital} </h4></div> 
                  <div className="flex"><h4>Region : </h4> <h4>{countryData.region} </h4></div> 
                  <div className="flex"><h4>Subregion : </h4> <h4>{countryData.subregion} </h4></div> 
                </div>
              </div> 

              <div className="flex flex-root mt-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 mr-4">
                  <h4>Calling Code</h4>
                  <h1 className="mt-2 text-4xl font-bold text-purple-800 ">{countryData.callingcode}</h1> 
                  <div className="relative group inline-block">
                    <button className="text-purple-800">
                      {countryData.callingcodeList.length} countries
                    </button> with this calling code
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded px-2 py-1 whitespace-nowrap z-10">
                      {
                        countryData.callingcodeList.map((item, index) => (
                          <span key={index}>{item}<br/></span>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
                  <h4>Currency</h4>
                  <h1 className="mt-2 text-4xl font-bold text-purple-800 ">{countryData.currency}</h1> 
                  <div className="relative group inline-block">
                    <button className="text-purple-800">
                      {countryData.currencyList.length} countries
                    </button> with this currency
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded px-2 py-1 whitespace-nowrap z-10">
                      {
                        countryData.currencyList.map((item, index) => (
                          <span key={index}>{item}<br/></span>
                        ))
                      }
                    </div>
                  </div> 
                </div>
              </div>

            </div>
          : <></>
        }
        
      </main>
    </div>
  );
}