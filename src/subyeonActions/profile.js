import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from '@firebase/app'


const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const sUpdateProfile = (userInfo) =>{
  return new Promise((resolve, reject)=> {
    const database = firebase.database();
    const { currentUser } = firebase.auth();

    database.ref('users/'+ currentUser.uid).set({...userInfo, updatedAt: Date() })
        .then((res) => {
        console.log('user info updated');
        resolve(userInfo);
        })
        .catch(error => {
        console.log('fail to update userinfo' + error);
        reject(error);
      });
   })
 }


export const sGetCurrentUserInfo = () =>{
   return new Promise((resolve, reject) => {
    const database = firebase.database();
    const { currentUser } = firebase.auth();
    if(currentUser.uid){
      database.ref('users/' + currentUser.uid).once('value')
    .then( snapshot => {
      const userInfo = snapshot.val();
      resolve(userInfo);
      })
    .catch( () => {
      const error = 'sGetCurrentUserInfo fail'
      reject(error);
    })
  }
  else {
    const error = 'uid does not exist'
    reject(error);
      }
    }
  )
}


export const sUploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      // const sessionId = new Date().getTime()
      let uploadBlob = null
      // const imageRef = storage.ref('images').child(`${sessionId}`)
      const { currentUser } = firebase.auth();
      const imageRef = firebase.storage().ref().child('users/'+ currentUser.uid +'/images/profileImg.jpg');

      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        console.log('upload ok');
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
