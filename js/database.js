import { firestore } from "./firebase.js";

const CountDocId = "ixEBeWeQcRGCasWla9Yh"

switch (Notification.permission) {
  case "default":
    Notification.requestPermission();
    break;
  case "denied":
    alert("通知を許可してください");
    break;
}

function notification() {
  switch (Notification.permission) {
    case "default":
      Notification.requestPermission();
      break;
    case "granted":
      new Notification("明日は家庭ごみの回収日です");
      break;
    case "denied":
      alert("通知が拒否されています");
      break;
  }
}

window.onload = async () => {
  try {
    const getShot = await firestore.collection("UserData").get();
    const getData = getShot.docs.map((doc) => ({
      id: doc.id,
      UserPft: doc.data().UserPft,
      UserCity: doc.data().UserCity,
      UserTown: doc.data().UserTown,
    }));
    const UserId = getData[0].id;
    const UserPft = getData[0].UserPft;
    const UserCity = getData[0].UserCity;
    const UserTown = getData[0].UserTown;

    const snapShot = await firestore
      .collection("GarbageData")
      .where("pft", "==", UserPft)
      .where("city", "==", UserCity)
      .where("town", "==", UserTown)
      .get();

    const DoW = snapShot.docs.map((doc) => ({
      id: doc.id,
      gar1: doc.data().gar1,
      gar2: doc.data().gar2,
    }));
    const gar1 = DoW[0].gar1;
    const gar2 = DoW[0].gar2;

    const hour = new Date().getHours();
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const ToDay = days[new Date().getDay()];
    let AlertDay1 = -1;
    let AlertDay2 = -1;

    for (let i = 0; i < 7; i++) {
      if (gar1 == days[i]) {
        if (i != 0) {
          AlertDay1 = days[i - 1];
        } else {
          AlertDay1 = days[6];
        }
      }
      if (gar2 == days[i]) {
        if (i != 0) {
          AlertDay2 = days[i - 1];
        } else {
          AlertDay2 = days[6];
        }
      }
    }

    if (ToDay == AlertDay1 || AlertDay2) {
      if (hour == 21) {
        notification();
      }
    }

    const UserData = [UserPft, UserCity, UserTown, gar1, gar2];
    msg.innerText = "・"+UserData[0] + UserData[1] + UserData[2];

    gar_1.innerText = "・"+UserData[3];
    switch (UserData[3]) {
      case "sun":
        gar_1.innerText = "・"+"日曜日";
        break;
      case "mon":
        gar_1.innerText = "・"+"月曜日";
        break;
      case "tue":
        gar_1.innerText = "・"+"火曜日";
        break;
      case "wed":
        gar_1.innerText = "・"+"水曜日";
        break;
      case "thu":
        gar_1.innerText = "・"+"木曜日";
        break;
      case "fri":
        gar_1.innerText = "・"+"金曜日";
        break;
      case "sat":
        gar_1.innerText = "・"+"土曜日";
        break;
    }

    gar_2.innerText = "・"+UserData[4];
    switch (UserData[4]) {
      case "sun":
        gar_2.innerText = "・"+"日曜日";
        break;
      case "mon":
        gar_2.innerText = "・"+"月曜日";
        break;
      case "tue":
        gar_2.innerText = "・"+"火曜日";
        break;
      case "wed":
        gar_2.innerText = "・"+"水曜日";
        break;
      case "thu":
        gar_2.innerText = "・"+"木曜日";
        break;
      case "fri":
        gar_2.innerText = "・"+"金曜日";
        break;
      case "sat":
        gar_2.innerText = "・"+"土曜日";
        break;
    }

    function buttonClick() {
      if (window.confirm("本当に削除しても大丈夫ですか？")) {
        firestore.collection("UserData").doc(UserId).delete();
        alert("削除しました。ホームで再度住所を登録してください。");
        firestore.collection("Count").doc(CountDocId).update({
          PushCount:-1
        })
      } else {
        alert("削除しませんでした");
      }
    }

    const button = document.getElementById("btn");
    button.onclick = buttonClick;
  } catch (e) {
    alert(
      "存在しない住所が登録されたか、または住所が登録されていません。ホームから住所を登録してください。"
    );
    firestore.collection("Count").doc(CountDocId).update({
      PushCount:-1
    })
    const getShot = await firestore.collection("UserData").get();
    const getData = getShot.docs.map((doc) => ({
      id: doc.id,
      UserPft: doc.data().UserPft,
      UserCity: doc.data().UserCity,
      UserTown: doc.data().UserTown,
    }));
    const UserId = getData[0].id;
    firestore.collection("UserData").doc(UserId).delete();
  }
};
