import { render, element } from "./view/html-util";
import  firebase from 'firebase';

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


const todos = [
  { id: 100, title: "title100", isDone: false },
  { id: 101, title: "title101", isDone: true },
  { id: 102, title: "title102", isDone: false },
]
class TodoItemModel {
  private id: number;
  private title: string;
  private isDone: boolean;
  constructor({ title }) {
    this.id = Date.now();
    this.title = title;
    this.isDone = false
  }
}
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
  addTodo( item ) {
    this.items.push( item )
  }
}
export class App {
  private todoListModel: any;
  constructor() {
    this.todoListModel = new TodoListModel();
  }
    
  render() {
    const jsTodoList = document.querySelector('#js-todo-list');
    const jsTodoCount = document.querySelector('#js-todo-count');

    const ul = element`<ul />` ;
    const items = this.todoListModel.getItems();
    const itemTotalCount = this.todoListModel.getTotalCount();

    items.forEach( item => {
      const li = element`<li>${ item.title }</li>`
      ul.appendChild(li);
    })
    jsTodoCount.textContent = `Total Items Count: ${ itemTotalCount }`
    render(ul, jsTodoList)
  }
  firstRender() {
    this.todoListModel.setItems(todos);
    this.render()
  }
  addTodo() {
    const jsForm = document.querySelector('#js-form');
    const jsFormInput: any = document.querySelector('#js-form-input');

    jsForm.addEventListener('submit', (event) =>{
      event.preventDefault();
      this.todoListModel.addTodo( new TodoItemModel({
        title: jsFormInput.value 
      }))


    collection.add({
      id: Date.now(),
      title: jsFormInput.value,
      isDone: false,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })



      jsFormInput.value = '';
      // this.render();
    })
  }

  main() {
    const jsTodoList = document.querySelector('#js-todo-list');
    const ul = document.createElement('ul');

    this.addTodo();
    // this.firstRender();

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