import firebase from '@firebase/app'

export const sGetHeart = () => {
      return new Promise((resolve, reject) => {
        const database = firebase.database();
        const currentUser = firebase.auth().currentUser;
        database.ref('users/' + currentUser.uid + '/heart').once('value')
        .then((heart) => {console.log(heart); resolve(heart.val())})
        .catch(() => reject('fail to get heart'))
      })
}

export const sUpdateHeart = (heart) => {
  return new Promise((resolve, reject) => {
    const database = firebase.database();
    const currentUser = firebase.auth().currentUser;
    database.ref('users/' + currentUser.uid + '/heart').set(heart)
    .then(() => {console.log('heart updated');resolve()})
    .catch(() => {console.log('heart fail');reject()})
  })
}
