import firebase from '@firebase/app'



export const sGetUserlist = () =>  {
  return new Promise ((resolve, reject) => {
    const usersRef = firebase.database().ref().child("users");
    const userlist = [];
     usersRef.on('child_added',(snap)=> {
       const { sex, age, nickname, profileUrl, city, number, selfIntro, uid, updatedAt,sendId } = snap.val();
       const profile = { sex, age, nickname, profileUrl, city, number, selfIntro,sendId,uid, updatedAt };
       console.log(userlist);
       userlist.push(profile);
       resolve(userlist);
     })
   }
  )
}



export const sOnPressLike = (uid, myNickname) => {
  return new Promise ((resolve, reject) => {
    const userRef = firebase.database().ref('users/' + uid +'/liked');
    const { currentUser } = firebase.auth();
    const likeListRef = firebase.database().ref('users/'+currentUser.uid+'/like');
    const Ilike ={ uid: uid,
                   createdAt:Date()
    }
    const like = { nickname: myNickname,
                   createdAt:Date(),
                 }
    userRef.push(like)
    .then(() => {
       likeListRef.push(Ilike)
       .then(()=> {console.log('like'); resolve();})
      .catch(() => {console.log('like fail'); reject('like fail')})
    })
  })
}
