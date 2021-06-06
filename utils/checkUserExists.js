import { db } from "../firebase";

const checkUserExists = (email) =>
  db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((docSnapshot) => {
      var a = docSnapshot.forEach((doc) => doc.data());
      console.log(a);
      return false;
    })
    .catch((err) => console.log("ERROR ", err));

//   db
//     .collection("users")
//     .where("email", "==", email)
//     .get()
//     .then((querySnapshot) => {
//       console.log("______________________", querySnapshot);
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//       });
//       if (querySnapshot.length < 1) return false;
//       return true;
//     })
//     .catch((error) => {
//       console.log("Error getting documents: ", error);
//       return false;
//     });

export default checkUserExists;
