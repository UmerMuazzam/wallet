import Link from 'next/link';
import React from 'react'

const BackButton = ({ link}) => {
  return (
    <Link href={`${link}`}>
      <button className="absolute top-12 left-4 py-1 px-3 text-[11px] rounded-md text-white bg-blue">
        &larr; BACK
      </button>
    </Link>
  );
}

export default BackButton
