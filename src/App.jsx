import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [spchar, setSpChar] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passGenerator = useCallback(
    () => {
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      let num = "1234567890"
      let symbol = "!@#$%^&*()-_=+|{};:/?."
      let pass = ""

      if (number) str += num
      if (spchar) str += symbol

      for (let i = 1; i < length; i++) {
        let randIndex = Math.floor(Math.random() * str.length)
        pass += str.charAt(randIndex)
      }
      setPassword(pass)
    }, [length, number, spchar, setPassword],
  )

  const copyPassword = useCallback(
    () => {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
    },
    [password],
  )

  useEffect(() => {
    passGenerator()
  }, [length, number, spchar, passGenerator])

  return (
    <>
      <div className="mx-auto w-full h-80 px-6 py-2 bg-zinc-50">
        <h1 className='text-2xl text-center font-semibold my-4 text-blue-500'>Password Generator</h1>

        <div className='flex rounded-lg mt-5 w-full'>
          <input type="text" value={password} className='w-[75%] p-2 bg-gray-200 font-semibold text-blue-500' placeholder='Password' readOnly ref={passwordRef} />
          <button className='w-[28%] bg-blue-500 font-semibold px-4 py-2 text-center text-white' onClick={copyPassword} >Copy</button>
        </div>

        <div className='flex flex-col gap-2 justify-center items-start mt-4 pl-1'>
          <div className='flex items-center gap-2 text-lg font-medium'>
            <input type="range" className='cursor-pointer' min={8} max={50} value={length} onChange={(e) => { setLength(e.target.value) }} />
            <label className='text-blue-500'>Count : {length} </label>
          </div>

          <div className='flex items-center gap-2 text-lg font-medium'>
            <input type="checkbox" className='cursor-pointer' defaultChecked={number} onChange={() => setNumber((e) => !e)} />
            <label className='text-blue-500'>Include Numbers</label>
          </div>

          <div className='flex items-center gap-2 text-lg font-medium'>
            <input type="checkbox" className='cursor-pointer' defaultChecked={spchar} onChange={() => setSpChar((e) => !e)} />
            <label className='text-blue-500'>Special Characters</label>
          </div>

          <button className='bg-blue-500 text-lg font-semibold px-4 py-1 text-center text-white rounded-md w-full mt-3' onClick={passGenerator}>Change</button>
        </div>
      </div>
    </>
  )
}

export default App
