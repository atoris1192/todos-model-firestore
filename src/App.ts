import { render, element } from "./view/html-util";


const todos = [
  { id: 100, title: "title100", isDone: false },
  { id: 101, title: "title101", isDone: true },
  { id: 102, title: "title102", isDone: false },
]
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
}
export class App {
  private todoListModel: any;
  constructor() {
    this.todoListModel = new TodoListModel();
    console.log("App constructor...");
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
  main() {
    
    this.firstRender();
  }
}