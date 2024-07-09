import React from 'react'

const Error = ({children}) => {
  return (
    <div className="text-red-500 bg-red-50 rounded-lg py-2 px-4">
      {children}
    </div>
  );
}

export default Error
