import firebase from 'firebase';
export const UserList = () => {

  var userlist = firebase.database().ref().child("users")
  const arr = [];
  userlist.on('child_added', (snap) => {
    var nickname = snap.val().nickname;
    var number = snap.val().number;
    var sex = snap.val().sex;
    var city = snap.val().city;
    var profileUrl = snap.val().profileUrl;
    var selfIntro = snap.val().selfIntro;
    arr.push({
      profileUrl: profileUrl,
      nickname: nickname,
      number: number,
      sex : sex,
      selfIntro: selfIntro
    });

  });
    return arr
}
