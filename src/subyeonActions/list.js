import firebase from 'firebase';


export const sGetUserlist = () =>  {
  return new Promise ((resolve, reject) => {
   const usersRef = firebase.database().ref().child("users");
    const userlist = [];
     usersRef.on('child_added',(snap)=> {
       const { sex, age, nickname, profileUrl, city, number, selfIntro } = snap.val();
       const profile = { sex, age, nickname, profileUrl, city, number, selfIntro };
       console.log(userlist);
       userlist.push(profile);
     })
     if(userlist) {resolve(userlist);}
   }
  )
}
