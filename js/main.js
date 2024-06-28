import { firestore } from "./firebase.js";

switch (Notification.permission) {
  case "default":
    Notification.requestPermission();
    break;
  case "denied":
    alert("通知を許可してください");
    break;
}

const checkButton = document.getElementById("checkButton");
const formArrow = document.getElementById("form-arrow");
const formArrow2 = document.getElementById("form-arrow2");
const formArrow3 = document.getElementById("form-arrow3");
const nameText = document.getElementById("nameText");
const nameText2 = document.getElementById("nameText2");
const nameText3 = document.getElementById("nameText3");

const CountDocId = "ixEBeWeQcRGCasWla9Yh"
const CountDocRef = firestore.collection("Count").doc(CountDocId);
const CountDoc = await CountDocRef.get();

console.log(CountDoc.data().PushCount);

function buttonClick() {
  const text3List = nameText3.value.split(",");
  const cityName = text3List[0];

  if(CountDoc.data().PushCount == -1){
    const AddData = {
      UserPft: nameText.value,
      UserCity: nameText2.value,
      UserTown: cityName,
    };
    firestore.collection("UserData").add(AddData);
    alert("データを登録しました");
  }else if(CountDoc.data().PushCount == 1){
    alert("既にデータを登録しています。");
  }
  
  firestore.collection("Count").doc(CountDocId).update({
    PushCount:1
  })

  checkButton.classList.add("add_class_button");
}

function buttonClick_form(){
  if(formArrow.classList.contains("form-arrow_deg")){
    formArrow.classList.remove("form-arrow_deg");
  }else{
    formArrow.classList.add("form-arrow_deg");
  }
}

function buttonClick_form2(){
  if(formArrow2.classList.contains("form-arrow_deg")){
    formArrow2.classList.remove("form-arrow_deg");
  }else{
    formArrow2.classList.add("form-arrow_deg");
  }
}

function buttonClick_form3(){
  if(formArrow3.classList.contains("form-arrow_deg")){
    formArrow3.classList.remove("form-arrow_deg");
  }else{
    formArrow3.classList.add("form-arrow_deg");
  }
}

checkButton.addEventListener("click", buttonClick);
nameText.addEventListener("click", buttonClick_form);
nameText2.addEventListener("click", buttonClick_form2);
nameText3.addEventListener("click", buttonClick_form3);