'use client'
 
import {useState} from 'react';
import ReactCustomSearchList from 'react-custom-search-list';
import 'react-custom-search-list/style/react-custom-search-list.min.css';
import { useRouter } from 'next/navigation';
import { CountryModel } from '@/models/CountryModel';


export default function Home() {

  const { push } = useRouter();

  const [value, setValue] = useState('');
  const [countryList, setCountryList] = useState<CountryModel[]>([]);

  async function searchCountry(keyword: string) { 
    setValue(keyword);
    const res = await fetch('https://restcountries.com/v3.1/name/'+keyword, {headers: {}})
    const data = await res.json(); 
    setCountryList(data)
  }

  function selectCountry(country: string) {
    setValue(country)
    push('/country/'+country);
  }
 
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col row-start-2 items-center"> 

        <h1 className="text-xl font-semibold mb-2 items-center justify-center">Country</h1>
        <ReactCustomSearchList
          fullWidth
          value={value}
          onChange={(e) => searchCountry(e.target.value)}
          onClear={() => setValue('')}
          openOnClick={true} 
          theme="panel"
          placeholder="Type any country name"
          >
          <ul>
            {
              countryList.length > 0 
              ? countryList.map((item, index) => (
                index <= 4
                ? <li 
                    key={index} 
                    onClick={() => selectCountry(item.name.common)}
                    className="cursor-pointer hover:bg-blue-100 px-4 py-2"
                  >
                    {item.name.common}
                  </li>
                : <span key={index}></span>
              ))
              : <></>
            }
          </ul>
        </ReactCustomSearchList>

      </main>
    </div>
  );
}
