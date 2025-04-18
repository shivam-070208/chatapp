import React from 'react'

const ChatCard = ({items,lastMessage}) => {
  
  return (
    <>
     <div className='rounded-md h-[6vh] flex items-center gap-2 border-b-1 pl-2 w-full  bg-[#f6fafd]'>
                <img src={items.profilephoto} className='bg-white rounded-[50%] object-cover w-7 h-7' alt="" />
                <div className='w-[90%]'>
                    <p className='text-[0.8rem] font-[500] text-black'>{items.Name}</p>
                    <p className='text-[0.6rem] text-zinc-500 '>{lastMessage}</p>
                </div>
            </div>
    </>
  )
}

export default ChatCard
