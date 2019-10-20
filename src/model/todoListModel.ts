import { EventEmitter } from '../EventEmitter';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCd5tM9yxxuy_JaB7dq5ZDi_WkuB6g9FNs",
  authDomain: "test01-b1b55.firebaseapp.com",
  databaseURL: "https://test01-b1b55.firebaseio.com",
  projectId: "test01-b1b55",
  storageBucket: "test01-b1b55.appspot.com",
  messagingSenderId: "594072733076",
  appId: "1:594072733076:web:59f6f574cde542f64efb81",
  measurementId: "G-NC8XWP6JXE"
};
firebase.initializeApp(config);
export const db = firebase.firestore()
export const collection = db.collection('todos')


export class TodoListModel extends EventEmitter {
  private items: any;
  constructor(items = []) {
    super();
    this.items = items;
  }
  getItems () {
    return this.items;
  }
  setItems(items) {
    this.items= items;
  }
  getTotalCount() {
    return this.items.length;
  }
  addTodo({ title }) {
    collection.add({
      id: Date.now(),
      title: title,
      isDone: false,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
    // this.items.push( item )
  }
  checkItem({ id, isDone }) {
    let item = collection.doc(id);
    let updateItem = item.update({
      isDone: isDone
    })
  }
  test01() { // all items
    let citiesRef = db.collection('todos');
    let allCities = citiesRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }
  test02() { // 単体ドキュメント取得 _ID 取得
    let item = db.collection('todos').doc('4mB76FWKhs4c4UsYgP4h');
    let getDoc = item.get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document...");
        } else {
          console.log("Doc item: ",doc.id, ":", doc.data());
        }
      })
      .catch( err => {
        console.log("Error: ", err);
      })
  }
  test03() { // where 条件　複数items
    let col = db.collection('todos');
    let query = col.where('isDone', '==', false).get()
      .then(snapshot => {
        if(snapshot.empty) {
          console.log("No mauch document.");
          return;
        }
        snapshot.forEach( doc => {
          console.log(doc.id, ':', doc.data());
        })
      })
      .catch( err => {
        console.log("Error: ", err);
      })
  }
  test04() { // Merge optionが無いと、全体上書き ない場合は新規作成
    let item = db.collection('todos').doc('4mB76FWKhs4c4UsYgP4h')
    let setItem = item.set({
      addKey: 'test04...'
    }, { merge: true })

  }
  test05() { // update 値の更新
    let item = db.collection('todos').doc('8D5HNkvbkYh6rauYdIZ0')
    let updateItem = item.update({ isDone: true })
    updateItem = item.update({ update_at: firebase.firestore.FieldValue.serverTimestamp()})
  }
}