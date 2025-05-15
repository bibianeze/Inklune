import React from 'react'

const Features = () => {
  return (
    <div>
      <div>
        <div className="container mx-auto w-11/12 ">
          {/* first */}
          <div className="flex items-center justify-between">
            <h3>Features</h3>
            <div className="bg-[rgba(188,178,218,0.3)] p-3 flex gap-3 rounded-xl">
              <p className="bg-white px-5 rounded-xl">latest</p>
              <p>Popular</p>
              <p>Editors pick</p>
            </div>
          </div>
          {/* main features */}
          <div></div>
          {/* button */}
          <div className='w-full text-center'>
            <button className='border-2 p-1 text-center'>View More Stories</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features