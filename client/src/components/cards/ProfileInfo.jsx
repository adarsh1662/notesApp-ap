import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({ userInfo, onLogout }) => {

  return (
    userInfo && <div className='flex items-center gap-3'>
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-bold font-medium bg-peach'>
          {getInitials(userInfo.fullName)}
        </div>

        <div>
          {/* <p className='text-sm font-medium'>{userInfo.fullName}</p> */}
          <button className='text-sm text-slate-900 underline hover:shadow-md' onClick={onLogout}>Logout</button>

        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
