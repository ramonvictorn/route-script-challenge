import React from 'react';
function User({user,show}) {
  return (
    <div className={'lineUser'} onClick={show}>
      Id:{user.id} Login: {user.login}
    </div>
  )
}
export default User;