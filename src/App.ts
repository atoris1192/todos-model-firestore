import { render, element } from "./view/html-util";
// import  firebase from 'firebase';
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
const db = firebase.firestore()
const collection = db.collection('todos')


class TodoListModel {
  private items: any;
  constructor(items = []) {
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
}
export class App {
  private todoListModel: any;
  constructor() {
    this.todoListModel = new TodoListModel();
  }
    
  addTodo() {
    const jsForm = document.querySelector('#js-form');
    const jsFormInput: any = document.querySelector('#js-form-input');

    jsForm.addEventListener('submit', (event) =>{
      event.preventDefault();
      this.todoListModel.addTodo({
        title: jsFormInput.value
      })

      jsFormInput.value = '';
      // this.render();
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

  main() {
    const jsTodoList = document.querySelector('#js-todo-list');
    const jsTodoCount = document.querySelector('#js-todo-count');
    const ul = document.createElement('ul');
    
  //  this.test01() 
    

    this.addTodo();

    collection.orderBy('created_at', 'desc')
      .onSnapshot( snapshot => {
        snapshot.docChanges().forEach( change => {
          if (change.type === 'added') {
            const li = document.createElement('li');
            li.textContent = change.doc.data().title
            ul.appendChild(li);
          }
        })
      })

    render(ul, jsTodoList);
  }
}