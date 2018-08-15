import { Platform } from 'react-native';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const sUpdateProfile = (userInfo) =>{
  return new promise((resolve, reject)=> {
    console.log(userInfo);
    const database = firebase.database();
    const { currentUser } = firebase.auth();
   database.ref('users/'+ currentUser.uid).set(userInfo1)
        .then((userInfo) => {
        console.log('user info updated');
        resolve(userInfo);
        })
        .catch(error => {
        console.log('fail to update userinfo' + error);
        reject(error);
      });
   })
 }


export const sGetCurrentUserInfo = () =>
  { return new Promise((resolve, reject) => {
    const database = firebase.database();
    const { currentUser } = firebase.auth();
    if(currentUser.uid){
      database.ref('users/' + currentUser.uid).once('value')
    .then( snapshot => {
      const userInfo = snapshot.val();
      resolve(userInfo);
      })
    .catch( (error) => {
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

// export const sImageUpload = (profileImgData) =>
// const {currentUser} = firebase.auth();
// const storageRef = firebase.storage().ref();
// const profileImagesRef = storageRef.child ( 'users/'+ currentUser.uid +'/images/profileImg.jpg');
// profileImagesRef.putString(profileImgData, 'base64', {contentType:'image/jpeg'})
// .then((res) => {console.log(res + 'upload ok'); dispatch(Promise.resolve(res))})
// .catch((err) => {console.log(err + 'upload fail'); dispatch(Promise.reject(err))})
// }

// export const sGetProfileImgUrl = ( uid ) =>
// return new Promise((resolve, reject) => {
//   const storage = firebase.storage();
//   const storageRef = storage.ref( 'users/'+ uid+'/images/' );
//   const profileRef = storageRef.child('profileImg.jpg');
//   profileRef.getDownloadURL()
//   .then(url => {
//     console.log('get url success url:' + url);
//     resolve(url));
//   })
//   .catch(error => {
//     console.log('fail to get url' + error );
//     reject(error));
//   })
// }

// export const sUploadImage = (uri) =>{
// return new Promise ((resolve, reject) => {
//   fetch(uri)
//   .then((res) => res.blob()
//     .then((blob) => {
//       const { currentUser } = firebase.auth();
//       const storageRef = firebase.storage().ref();
//       const ref = firebase.storage().ref().child('users/'+ currentUser.uid +'/images/profileImg.jpg');
//       ref.put(blob)
//       .then((snapshot) => snapshot.ref.getDownloadURL()
//         .then((downloadURL) => {console.log('upload ok'); resolve(downloadURL);})
//         .catch((error) => {console.log('upload fail1', error); reject(error);})
//       )
//       .catch((error) => {console.log('upload fail2', error); reject(error);});
//     })
//     .catch((error) => {console.log('upload fail3',error); reject(error);})
//   )
//   .catch((error) => {console.log('upload fail4',error); reject(error);})
//     }
//   )
// }


export const sUploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      // const sessionId = new Date().getTime()
      let uploadBlob = null
      // const imageRef = storage.ref('images').child(`${sessionId}`)
      const { currentUser } = firebase.auth();
      console.log('1');
      const imageRef = firebase.storage().ref().child('users/'+ currentUser.uid +'/images/profileImg.jpg');

      console.log('11');
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        console.log('2');
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        console.log('3');
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        console.log('4');
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
