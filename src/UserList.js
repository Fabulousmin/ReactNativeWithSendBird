import firebase from 'firebase';
export const UserList = () => {
  var userlist = firebase.database().ref().child("users")
  const arr = [];
  userlist.on('child_added', function(snap){
    var nickname = snap.val().nickname;
    var number = snap.val().number;
    var sex = snap.val().sex;
    var city = snap.val().city;
    arr.push({
      nickname: nickname,
      number: number,
      sex : sex,
    })});
    return arr
}
