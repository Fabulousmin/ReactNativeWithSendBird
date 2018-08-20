import firebase from 'firebase';



export const sGetUserlist = () =>  {
  return new Promise ((resolve, reject) => {
    const usersRef = firebase.database().ref().child("users");
    const userlist = [];
     usersRef.on('child_added',(snap)=> {
       const { sex, age, nickname, profileUrl, city, number, selfIntro, uid, updatedAt } = snap.val();
       const profile = { sex, age, nickname, profileUrl, city, number, selfIntro, uid, updatedAt };
       console.log(userlist);
       userlist.push(profile);
       resolve(userlist);
     })
   }
  )
}



export const sOnPressLike = (uid, myNickname) => {
  return new Promise ((resolve, reject) => {
    const userRef = firebase.database().ref('users/' + uid +'/like');
    const like = { nickname: myNickname,
                   createdAt:Date(),
                 }
    userRef.push(like)
    .then(() => {console.log('like'); resolve(like); })
    .catch(() => {console.log('like fail'); reject('like fail')})
    }
  )
}
